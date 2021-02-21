import React from "react";
import logPresenter from "./presenter"
import ReactModal from 'react-modal';
import { TASK_STATES } from "../../model/enums";
import TaskStorage from "storage/task-storage";
import TaskCheck from "../shared/task-check";
import "./style.scss"

const Log = ({ isVisible, task, taskLog, pushState }) => {

  const taskStorage = new TaskStorage();

  return (
    <ReactModal
      isOpen={isVisible}
      className="modal"
      overlayClassName="modal-overlay"
      onRequestClose={() => logPresenter.cancelLog(pushState)}
    >
      {(taskLog && task) ?
        (<div className="flex-column" >
          <div className="flex-row">
            <TaskCheck
              sizeClass="box-1-1"
              taskLog={taskLog}
              onTaskChecked={
                () => logPresenter.setTaskToNextState(
                  {
                    task: task,
                    log: taskLog
                  },
                  taskStorage,
                  pushState
                )
              }>
            </TaskCheck>
            <div className="flex-row flex-align-center">
              <span className="header-text">{task.title}</span>
              <span className="info-text">{taskLog.unit.id}</span>
            </div>
          </div>
          {task.subtasks && task.subtasks.map((subTask, i) =>
            <div className="sub-task">
              <input
                className="task-item"
                name="task"
                type="checkbox"
                id={`subtask-${i}`}
                onChange={
                  (e) => logPresenter.setSubTaskToNextState(
                    {
                      task: task,
                      log: taskLog,
                      subTask: subTask,
                      isDone: e.target.checked
                    },
                    taskStorage,
                    pushState
                  )}
                checked={taskLog.state.getStateOfSubTas(subTask) === TASK_STATES.done} />
              <label for={`subtask-${i}`}>
                <span className="checkbox-label info-text">{subTask}</span>
              </label>
            </div>
          )}
        </div >) : (<span>not selected any task !!</span>)
      }
    </ReactModal>);
};

export default Log;
