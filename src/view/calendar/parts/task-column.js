import React from "react";
import TaskCheck from "../../shared/task-check";

const TaskColumn = ({ header, taskLogs, onTaskChecked, onHeaderClick }) => {
    return (
        <div className="calendar-column">
            <header className="box box-3-1 task-header day-task-header">
                <a
                    href="#"
                    onClick={onHeaderClick}>
                    {header}
                </a>
            </header>
            <div className="calendar-units flex-row">
                {taskLogs && taskLogs.map((taskLog) => (
                    <TaskCheck
                        taskLog={taskLog}
                        onTaskChecked={() => onTaskChecked && onTaskChecked(taskLog)}
                    ></TaskCheck>
                ))}
            </div>
        </div >
    );
};
export default TaskColumn