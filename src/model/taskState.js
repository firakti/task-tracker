import { PROGRESS_TYPES, TASK_STATES } from "./enums";

class TaskState {
    constructor(progressType = PROGRESS_TYPES.single) {
        this.completeState = TASK_STATES.notSet;
        this.stepCount = null;
        this.progressType = progressType;
        this.completedStepCount = null;
        this.subTaskState = {};
    }
    toDoc() {
        return {
            completeState: this.completeState,
            stepCount: this.stepCount,
            progressType: this.progressType,
            completedStepCount: this.completedStepCount,
            subTaskState: this.subTaskState,
        };
    }
    getStateOfSubTas(subTask) {
        if (!this.subTaskState) {
            return TASK_STATES.notSet;
        }
        return this.subTaskState[subTask] || TASK_STATES.notSet;
    }

    setSubTaskState(subTask, isDone, subtasks) {
        this.subTaskState = this.subTaskState ?? {};
        this.subTaskState[subTask] = isDone ? TASK_STATES.done : TASK_STATES.notDone;
        if (this.isAllSubtasksDone(subtasks))
            this.completeState = TASK_STATES.done;
    }
    isAllSubtasksDone(subtasks) {
        subtasks.forEach(subtask => {
            if (this.getStateOfSubTas(subtask) !== TASK_STATES.done) {
                return false;
            }
        });
        return true;
    }

    gotoNextState() {
        if (this.progressType === PROGRESS_TYPES.single) {
            if (this.completeState === TASK_STATES.done) {
                this.completeState = TASK_STATES.notDone;
            } else if (this.completeState === TASK_STATES.notDone || this.completeState === TASK_STATES.notSet) {
                this.completeState = TASK_STATES.done;
            }
        }
        else {
            if (this.completeState === TASK_STATES.done) {
                this.completeState = TASK_STATES.notDone;
            } else if (this.completeState === TASK_STATES.notDone ||
                this.completeState === TASK_STATES.notSet ||
                this.completeState === TASK_STATES.partialDone) {
                this.completedStepCount += 1;
                if (this.completedStepCount >= this.stepCount) {
                    this.completeState = TASK_STATES.done;
                }
                else {
                    this.completeState = TASK_STATES.partialDone;
                }
            }
        }
    }
}
export default TaskState