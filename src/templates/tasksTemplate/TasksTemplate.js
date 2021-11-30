import React from 'react'

const TasksTemplate = (
    tasksState, 
    selectedValue,
    handleSelectedValue
    ) => {
    return (
        <div>
            {console.log(selectedValue)}
            <h1>Tasks</h1>
            <div>
                <button>Add Task</button>
                <button>Delete Tasks</button>
            </div>
            <div>
            <table>
                <tbody>
                    <tr>
                        <td rowSpan="3">
                            <select 
                            defaultValue={'none'}
                            onChange={handleSelectedValue}>
                                <option 
                                value='none'
                                disabled hidden>-Select A Project-</option>
                                {
                                    tasksState.map((taskObj, idx) => {
                                        return (
                                            <option key={idx} value={idx}>{taskObj.proj_name}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                selectedValue !== undefined && 
                                <ul>{                                    
                                    tasksState[selectedValue]["list_of_tasks"].map((task_obj, idx) => {
                                        return (
                                            <li key={idx}>{task_obj.task}</li>
                                        )
                                    })
                                    }
                                </ul>
                            }
                        </td>
                        <td>Top Priority</td>
                    </tr>
                    <tr>
                        <td>End of Day (E.O.D)</td>
                    </tr>
                    <tr>
                        <td>Upcoming</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default TasksTemplate
