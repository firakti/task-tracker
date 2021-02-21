/* eslint-disable no-eval */
import React from "react";
import { TASK_STATES } from "../../../model/enums";
import "./style.scss"

const TaskCheck = ({ taskLog, onTaskChecked, sizeClass }) => {
    const getSizeClass = (unit) => (unit ? `box-${unit.range}-1` : "box-1-1");

    const renderCheck = (taskState) => {
        switch (taskState.completeState) {
            case TASK_STATES.done:
                return <i className="material-icons task-check task-done">done</i>;
            case TASK_STATES.partialDone:
                return (
                    <a className="box box-1-1" href="#">
                        <i className="material-icons task-check task-done">done</i>
                        <span>{Math.round((taskState.completedStepCount / taskState.stepCount) * 100)}%</span>
                    </a>
                )
            case TASK_STATES.notSet:
            case TASK_STATES.notDone:
            default:
                return <i className="material-icons task-check task-not-set">remove</i>;

        }
    };
    return (
        <a className={`box  ${sizeClass ?? getSizeClass(taskLog.unit)}`}
            onClick={onTaskChecked}
            href="#">
            {renderCheck(taskLog.state)}
        </a>
    );
};


export default TaskCheck;