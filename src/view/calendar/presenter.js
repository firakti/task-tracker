/* eslint-disable no-unused-vars */
import TaskStorage from "storage/task-storage";
/* eslint-enable no-unused-vars */
import { TIME_PERIODS } from "model/enums";
import check from "utils/check";
import JustDate from "utils/just-date";
import logPresenter from "view/log/presenter";
//TODO refactor class to object
/**
 * 
 */
class CalendarPresenter {
  /**
   * @param  {} state
   * @param  {} pushState
   * @param  {TaskStorage} taskStorage
   */
  constructor(pushState, taskStorage) {
    this.pushState = pushState;
    this.taskStorage = taskStorage;
  }

  async loadCalender({ start, end } = {}) {

    this.pushState({ message: { text: "loading calendar." } });

    if (!start || !end) {
      const today = new JustDate();
      start = today.startOfMonth().date();
      end = today.endOfMonth().date();
    }
    const calendar = await this.taskStorage.getCalendar(start, end);
    this.pushState({ calendar, message: { text: "completed" } });
  }

  async goToNext({ startDate, timePeriod = TIME_PERIODS.month }) {

    const current = new JustDate(startDate);
    const nextPeriodStart = current.endOf(timePeriod).next();
    const nextPeriodEnd = nextPeriodStart.endOf(timePeriod);
    const calendar = await this.taskStorage.getCalendar(nextPeriodStart.date(), nextPeriodEnd.date());

    this.pushState({
      calendar,
      startDate: nextPeriodStart.date(),
      message: { text: "completed" }
    });
  }

  async goToBefore({ startDate, timePeriod = TIME_PERIODS.month }) {
    const current = new JustDate(startDate);
    const previousPeriodEnd = current.startOf(timePeriod).previous();
    const previousPeriodStart = previousPeriodEnd.startOf(timePeriod);
    const calendar = await this.taskStorage.getCalendar(previousPeriodStart.date(), previousPeriodEnd.date());

    this.pushState({
      calendar,
      startDate: previousPeriodStart.date(),
      message: { text: "completed" }
    });
  }

  // todo rename
  async goToNow({ timePeriod = TIME_PERIODS.month }) {

    const current = new JustDate();
    const currentPeriodStart = current.startOf(timePeriod);
    const currentPeriodEnd = current.endOf(timePeriod);
    const calendar = await this.taskStorage.getCalendar(currentPeriodStart.date(), currentPeriodEnd.date());

    this.pushState({
      calendar,
      startDate: currentPeriodStart.date(),
      message: { text: "completed" }
    });
  }

  async setTimePeriod({ startDate, timePeriod = TIME_PERIODS.month }) {
    const current = new JustDate(startDate);
    const end = current.endOf(timePeriod);
    const calendar = await this.taskStorage.getCalendar(current.date(), end.date());

    this.pushState({
      calendar,
      startDate,
      message: { text: "completed" },
      timePeriod
    });
  }

  openLog({ selectedTask, selectedLog }) {
    check.notNull(selectedLog, selectedLog);
    if (!selectedTask.subtasks) {
      logPresenter.setTaskToNextState({ log: selectedLog, task: selectedTask }, this.taskStorage, this.pushState);
    }
    else {
      this.pushState({ selectedTask, selectedLog, isLogVisible: true });
    }
  }

  openTaskEdit({ selectedTask }) {
    this.pushState({ isEditTaskVisible: true, selectedTask: selectedTask });
  }

};

export default CalendarPresenter;
