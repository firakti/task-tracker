//TODO validation


/* eslint-disable no-unused-vars */
import ActivityLog from "model/activity-log";
import Task from "model/task";
import TaskStorage from "storage/task-storage";
/* eslint-enable no-unused-vars */

import clone from "utils/clone";

const logPresenter = {
    async setTaskToNextState({ task, log }, taskStorage, pushState) {

        pushState({ message: { text: "updating" } });
        const currentState = clone(log.state)
        log.taskId = task.id;
        log.state.gotoNextState();

        pushState({
            selectedLog: log,
        });

        const result = await taskStorage.addLog(log);

        // if adding not succeed, push previous state back
        if (!result.ok) {
            log.state = currentState;
            pushState({
                selectedLog: log,
                message: { text: "error while adding task log", type: "error", errors: result.errors }
            });
        }
    },
    /**
     * @param  {Object} obj
     * @param  {Task} obj.task
     * @param  {ActivityLog} obj.log
     * @param  {String} obj.subTask
     * @param  {Boolean} obj.isDone
     * @param  {TaskStorage} taskStorage
     * @param  {Function} pushState
     */
    async setSubTaskToNextState({ task, log, subTask, isDone }, taskStorage, pushState) {

        pushState({ message: { text: "updating" } });
        const currentState = clone(log.state)
        log.taskId = task.id;
        log.state.setSubTaskState(subTask, isDone, task.subtasks);
        const result = await taskStorage.addLog(log);

        // if adding not succeed, push previous state back
        if (!result.ok) {
            log.state = currentState;
            pushState({
                selectedLog: log,
                message: { text: "error while adding task log", type: "error", errors: result.errors }
            });
        }
    },
    cancelLog(pushState) {
        pushState({ isLogVisible: false });
    },
};

export default logPresenter;
