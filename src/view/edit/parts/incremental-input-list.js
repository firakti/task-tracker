import React, { useState } from "react";
const IncrementalInputList = ({ values, onChangeValues }) => {

    const [newSubTask, setNewSubTask] = useState("")

    const updateField = (index, value) => {
        const newValues = values;
        newValues.splice(index, 1, value)
        onChangeValues([...newValues]);
    }

    const addNewSubTask = () => {
        const newValues = values || [];
        onChangeValues([...newValues, newSubTask]);
        setNewSubTask("");
    }

    return (
        <>
            {values && values.map((v, i) =>
                <input className="sub-task-edit"
                    type="text"
                    value={v}
                    onChange={(event) => updateField(i, event.target.value)}

                ></input>
            )}
            <div className="input-with-icon-container">
                <input className="sub-task-edit"
                    type="text"
                    value={newSubTask}
                    placeholder="Add sub task"
                    onChange={(event) => setNewSubTask(event.target.value)}
                ></input>
                <a href="#" onClick={addNewSubTask}>
                    <i className="material-icons form-icon">add</i>
                </a>
            </div>
        </>
    )
};

export default IncrementalInputList;