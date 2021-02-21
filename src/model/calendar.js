import { TIME_PERIODS } from "./enums";
import { getTimeUnitsInRange } from "utils/date";
import Activity from "./activity";
import  Task from "./task";

export default class Calendar {
    constructor() {
        this.unitType = TIME_PERIODS.day;
        this.days = [];
        this.activities = [];
    }
    static fromDoc(startDate, endData, tasks, logs) {

        const mapLogsToTask = (logs) => {

            if (!logs && logs.length === 0) {
                return {};
            }
            const logMap = {};
            logs.forEach(item => {
                if (item.taskId && item.unitId) {
                    if (!(item.taskId in logMap)) {
                        logMap[item.taskId] = {};
                    }
                    logMap[item.taskId][item.unitId] = item;
                }
            });
            return logMap;
        };

        const calendar = new Calendar();
        calendar.days = getTimeUnitsInRange(TIME_PERIODS.day, startDate, endData);
        if (tasks && logs) {
            tasks = Task.orderTaskByPeriod(tasks);
            const mappedLogs = mapLogsToTask(logs);
            tasks.forEach((task) => {
                const activity = Activity.fromDoc(
                    task,
                    mappedLogs[task.id],
                    startDate,
                    endData
                );
                calendar.activities.push(activity);
            });

        }
        return calendar;
    }
}
