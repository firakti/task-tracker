//TODO interval rename ui
//TODO select style
import React, { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import TaskStorage from "storage/task-storage";
import { PROGRESS_TYPES, TIME_PERIODS, TASK_PRIORITIES } from "model/enums";
import check from "utils/check";
import InputError from "view/shared/error-message";
import editPresenter from "view/edit/presenter";
import IncrementalInputList from "view/edit/parts/incremental-input-list";
import "./style.scss";

const EditTask = ({
  task,
  validationErrors,
  isVisible,
  pushState,
}) => {

  const [taskDraft, setTaskDraft] = useState(
    {
      period: TIME_PERIODS.day,
      priority: TASK_PRIORITIES.normal,
      progressType: PROGRESS_TYPES.single
    });

  const [isEdit, setIsEdit] = useState(false);
  const taskStorage = new TaskStorage();
  const setField = (field, value) => {
    setTaskDraft({ ...taskDraft, [field]: value });
  };

  const setProgressType = (value) => {
    let stepCount = 0;
    let progressType = PROGRESS_TYPES.single;
    switch (value) {
      case "single":
        stepCount = 1;
        progressType = PROGRESS_TYPES.single;
        break;
      case "stepped-2":
        stepCount = 2;
        progressType = PROGRESS_TYPES.stepped;
        break;
      case "stepped-5":
        stepCount = 5;
        progressType = PROGRESS_TYPES.stepped;
        break;
      case "stepped-10":
        stepCount = 10;
        progressType = PROGRESS_TYPES.stepped;
        break;
      default:
        stepCount = 1;
        progressType = PROGRESS_TYPES.single;
        break;
    }
    setTaskDraft({ ...taskDraft, progressType, stepCount });
  };

  const getProgressType = (value, stepCount) => {
    switch (value) {
      case PROGRESS_TYPES.single:
        return "single";
      case PROGRESS_TYPES.stepped:
        return "stepped-" + stepCount;
      default:
        return "single";
    }
  };

  useEffect(() => {
    if (!check.isNullOrEmpty(task)) {
      setTaskDraft({ ...task });
      setIsEdit(Boolean(task));
    }
  }, [task]);

  return (
    <ReactModal
      isOpen={isVisible}
      className="add-task-modal modal"
      overlayClassName="modal-overlay"
      onRequestClose={() => editPresenter.cancelEdit(pushState)}
    >
      <div className="flex-column">
        <label className="form-field-label">task name</label>
        <input
          className="task-input"
          type="text"
          value={taskDraft.title}
          onChange={(event) => setField("title", event.target.value)}
          placeholder="task"
        ></input>
        <IncrementalInputList
          values={taskDraft.subtasks}
          onChangeValues={(value) => setField("subtasks", value)}
        >
        </IncrementalInputList>
        <label className="form-field-label">description</label>
        <InputError errors={validationErrors?.title}></InputError>
        <textarea
          type="text"
          value={taskDraft.description}
          onChange={(event) => setField("description", event.target.value)}
          placeholder="description"
        >
        </textarea>
        <InputError errors={validationErrors?.description}></InputError>
        <label className="form-field-label">repetition period</label>
        <div>
          <select
            name="period" id="period"
            value={taskDraft.period}
            onChange={(event) => setField("period", event.target.value)}
          >
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
            <option value="quarter">quarter</option>
          </select>
          <InputError errors={validationErrors?.period}></InputError>
        </div>
        <label className="form-field-label">priority</label>
        <div>
          <select
            name="priority" id="priority"
            value={taskDraft.priority}
            onChange={(event) => setField("priority", event.target.value)}
          >
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
            <option value="highest">highest</option>
          </select>
          <InputError errors={validationErrors?.priority}></InputError>
        </div>
        <div>
          {/** TODO make date input with place holder component */}
          {/* <label className="form-field-label">from date</label>
          <input type="date"
            value={taskDraft.fromDate}
            onChange={(event) => setField("fromDate", event.target.value)}>
          </input>
          <label className="form-field-label">to date</label>
          <input type="date"
            value={taskDraft.toDate}
            onChange={(event) => setField("toDate", event.target.value)}>
          </input> */}
          {/*
          add picker day,week month year quarter 
          https://reactdatepicker.com/#example-year-picker
         */}
        </div>
        {taskDraft.subtasks ? null :
          <div>
            <label className="form-field-label">task progress</label>
            <select
              name="type"
              id="type"
              value={getProgressType(taskDraft.progressType, taskDraft.stepCount)}
              onChange={(event) => setProgressType(event.target.value)}
            >
              <option value="single">single step</option>
              <option value="stepped-2" >2 step</option>
              <option value="stepped-5" >5 step</option>
              <option value="stepped-10">10 step</option>
            </select>
          </div>
        }
        <div className="button-container">
          {isEdit ?
            <button
              className="button  danger"
              onClick={() => editPresenter.deleteTask({ taskId: task.id, }, taskStorage, pushState)}
            >
              delete
            </button> :
            null}
          <div>
            <button
              className="button  info"
              onClick={() => editPresenter.cancelEdit(pushState)}
            >
              cancel
            </button>
            <button
              className="button  primary save-button"
              onClick={() => editPresenter.saveTask({ task: taskDraft }, taskStorage, pushState)}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditTask;
