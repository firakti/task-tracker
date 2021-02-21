import FirebaseStorage from "services/storage"
import 'firebase/database'
import getUser from "utils/get-firebase-user";
import check from "utils/check";
/* eslint-disable no-unused-vars */
import wrapCall, { StoreResponse } from "utils/wrap-request-call";
import ActivityLog from "model/activity-log";
import Task from "model/task";
import Calendar from "model/calendar";
/* eslint-enable no-unused-vars */
class TaskStorage extends FirebaseStorage {

  async getUserId() {
    const user = await getUser(this.firebase);
    const userId = user.uid;
    return userId;
  }

  /**
   * @param  {Task} task
   */
  async add(task) {
    task.userId = await this.getUserId();
    const response = await wrapCall(
      this.firebase
        .firestore()
        .collection(`users/${task.userId}/task`)
        .add(task.toDoc())
    );
    return response
  }

  /**
  * @param  {Task} task
  * @returns {StoreResponse}
  */
  async update(task) {
    task.userId = await this.getUserId();
    const response = await wrapCall(
      this.firebase
        .firestore()
        .collection(`users/${task.userI}/task`)
        .doc(task.id)
        .update(task.toDoc())
    );
    return response
  }

  //TODO change doc structure as task/log
  /**
   * adds new log to firestore
   * @param {ActivityLog} log 
   * @returns {StoreResponse}
   */
  async addLog(log) {
    check.notNull(log);

    log.userId = await this.getUserId();
    const response = await wrapCall(
      this.firebase
        .firestore()
        .collection(`users/${log.userId}/log`)
        .doc(log.getLogKey())
        .set(log.toDoc()));
    return response
  }


  async delete(taskId) {
    const userId = await this.getUserId();
    const response = await wrapCall(
      this.firebase
        .firestore()
        .collection(`users/${userId}/task`)
        .doc(taskId)
        .update({ isDeleted: true }))
    return response
  }

  /**
   * @param  {Date} start
   * @param  {Date} end
   * @returns {Calendar}
   */

  async getCalendar(start, end) {
    const userId = await this.getUserId();

    const getTaskResponse = await wrapCall(
      this.firebase
        .firestore()
        .collection(`users/${userId}/task`)
        .where("isDeleted", "!=", true)
        .get()
    );


    if (!getTaskResponse.ok || getTaskResponse.length === 0) {
      return Calendar.fromDoc(start, end)
    }

    const taskIds = getTaskResponse.data.map(t => t.id);
    const getLogResponse = await wrapCall(
      this.firebase
        .firestore()
        .collection(`users/${userId}/log`)
        // .where("date", ">=", start.getTime())
        // .where('date', '<=', end.getTime())
        .where('taskId', 'in', taskIds)
        .get()
    );

    const calendar = Calendar.fromDoc(
      start,
      end,
      getTaskResponse.data,
      getLogResponse.data
    );
    return calendar;
  }
}

export default TaskStorage;
