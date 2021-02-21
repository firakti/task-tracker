import React from "react";
import CalendarPresenter from "./presenter";
import JustDate from "utils/just-date";
import Pagination from "./parts/navigation";
import { TIME_PERIODS } from "../../model/enums";
import TaskStorage from "storage/task-storage";
import TaskColumn from "./parts/task-column";
import Header from "./parts/header";
import "./style.scss";

/**
 * @param  {Calendar} {calendar
 */
const Calendar = ({
  calendar,
  startDate,
  timePeriod,
  pushState
}) => {

  timePeriod = timePeriod ?? TIME_PERIODS.month
  startDate = startDate ?? JustDate.getStartOf(null, timePeriod).date();
  const presenter = new CalendarPresenter(pushState, new TaskStorage());

  const renderCalendar = (calendar) => {
    return (
      <>
        <h4 className="calendar-header">{currentPeriodValue(startDate, timePeriod)}</h4>
        <div className="calendar-main">
          <Header header={calendar.unitType} days={calendar.days} />
          {calendar.activities.map(
            activity => (
              <TaskColumn
                header={activity.task.title}
                taskLogs={activity.logs}
                onHeaderClick={() => presenter.openTaskEdit({ selectedTask: activity.task })}
                onTaskChecked={(log) => presenter.openLog({ selectedTask: activity.task, selectedLog: log })}
              />)
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <main className="calendar-container">
        {calendar && renderCalendar(calendar)}
        <Pagination
          startDate={startDate}
          timePeriod={timePeriod}
          pushState={pushState}
        ></Pagination>
      </main>
    </>
  );
};


const currentPeriodValue = (start, period) => {
  const startDate = new JustDate(start);
  switch (period) {
    case TIME_PERIODS.week:
      return `${startDate.week()}. week of ${startDate.year()}`;
    case TIME_PERIODS.month:
      return `${startDate.monthName()} - ${startDate.year()}`;
    default:
      return "invalid-period";
  }
}

export default Calendar;
