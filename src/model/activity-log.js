import TaskState from "./taskState";

export default class ActivityLog {
  constructor(progressType, unit) {
    this.id = null;
    this.taskId = null;
    this.unit = unit;
    this.unitId = this.unit?.id;
    this.state = new TaskState(progressType);
    this.created = Date.now();
  }
  toDoc() {
    return {
      taskId: this.taskId,
      unitId: this.unit.id,
      state: this.state.toDoc(),
      created: this.created,
    };
  }
  /**
   * return unique key for log
   * key consist of task key and date unit key
   * there must ne only one log for a date unit
   */
  getLogKey() {
    return `${this.taskId}_${this.unit.id}`;
  }

  static fromDoc(doc, unit) {
    const log = new ActivityLog();

    log.id = doc.id;
    log.taskId = doc.taskId;
    log.unit = unit;
    log.unitId = doc.unitId;
    log.state.progressType = doc.state.progressType;
    /**
     *TODO for backward delete
     *doc.state.completeState ?? doc.state.state;
    */
    log.state.completeState = doc.state.completeState ?? doc.state.state;
    log.state.subTaskState = doc.state.subTaskState;
    log.state.completedStepCount = doc.state.completedStepCount;
    log.created = doc.created ?? Date.now();

    return log;
  }

  static validate(log) {
    return true;
  }
}
