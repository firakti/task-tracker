import check from "utils/check";
import { TIME_PERIODS } from "./enums";
import { getTimeUnitsInRange } from "utils/date";
import ActivityLog from "./activity-log";

//TODO rename contains all logs of task 
export default class Activity {
    /**
     * @param  {Task} task
     */
    constructor(task) {
        check.notNull(task);
        this.task = task;
        this.logs = [];
    }

    static fromDoc(task, logs = {}, startDate, endData) {
        const activity = new Activity(task);
        // get time units for task period
        const units = getTimeUnitsInRange(task.period || TIME_PERIODS.day, startDate, endData);
        units.forEach(unit => {
            if (logs[unit.id]) {
                activity.logs.push(ActivityLog.fromDoc(logs[unit.id], unit));
            }
            else {
                activity.logs.push(new ActivityLog(task.progressType, unit));
            }

        });
        return activity;
    }
}

