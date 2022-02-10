import React from 'react'
import '../../css/taskPage.css'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';

const TasksTemplate = (
    tasksState, // comp.state
    displayForm, 
    selectedValue, 
    inputTag,
    tags,
    taskDesc,
    missingFields,
    txtAreaTaskDescClassName,
    taskPrioLvlClassName,
    handleSelectedValue, // comp.handlers 
    toggleFrom,
    getDateHandler,
    submitTaskForm,
    handleInputTagChange,
    handleInputTag,
    handleSelectedPrio,
    handleTaskDesc
    ) => {
    return (
        <div>
            {/* {
                tasksState.forEach(taskObj => {
                    taskObj.proj_tasks.forEach(proj_task => {
                        console.log(proj_task.prio_lvl.lvl);
                    })
                })
            } */}
            <h1>Tasks</h1>
            <div>
                <button onClick={toggleFrom}>Add Task</button>
            </div>
            <div>
            <table className='taskTable'>
            <tbody>
                <tr className='taskTableRow'>
                    <td rowSpan="3" className='taskTableData'>
                        <select defaultValue={'none'} onChange={handleSelectedValue}>
                            <option value='none' disabled hidden>-Select A Project-</option>
                            {   tasksState.map((taskObj, idx) => <option key={idx} value={idx}>{taskObj.proj_name}</option>)    }
                        </select>
                        {   selectedValue !== undefined && 
                            <ul className='taskUl'>{                                    
                                tasksState[selectedValue]["proj_tasks"].map(
                                    (task_obj, idx) => <li className='task_desc' key={idx}>{task_obj.task_desc}</li>
                                )   }
                            </ul>   }
                    </td>
                    <td className='taskTableData'>
                        <p>Top Priority</p>
                        {/* WARNING FIND A WAY TO SHOW ALL TASK BASED ON PRIO LVL*/}
                        <ul>{   tasksState.forEach(taskObj => {
                            taskObj.proj_tasks.forEach( proj_task => {
                                return <li>{proj_task.prio_lvl.lvl}</li>
                            }) 
                        })}</ul>
                        {/* WARNING */}
                    </td>
                </tr>
                <tr className='taskTableRow'><td className='taskTableData'>End of Day (E.O.D)</td></tr>
                <tr className='taskTableRow'><td className='taskTableData'>Upcoming</td></tr>
            </tbody>
            </table>
            {   (displayForm && !selectedValue) ? <span>Please Select a Project</span> :
                !displayForm ? null :
                <form className='addTaskForm' onSubmit={submitTaskForm}>
                    <textarea 
                    className={txtAreaTaskDescClassName} // NOTE if invalid input this changes CSS to indicate to user missing field
                    value={taskDesc}
                    onChange={handleTaskDesc}/>
                    { (missingFields && missingFields.includes('date')) && <span>YO add the date</span>}
                    <CalendarComponent onChange={getDateHandler}/>
                    {   tags.length > 0 && tags }
                    <input
                    type="text"
                    value={inputTag}
                    className='taskTagInput'
                    onChange={handleInputTagChange}
                    onKeyDown={handleInputTag}
                    placeholder="Add a tag"
                    />
                    <select defaultValue='none' onChange={handleSelectedPrio} className={taskPrioLvlClassName}> 
                        <option value='none' disabled hidden>-Select Priority Level-</option>
                        <option value='top'>Top</option>
                        <option value='EOD'>End of Day</option>
                        <option value='upcoming'>Upcoming</option>
                    </select>
                    <div className='submitTaskBtnContainer'>
                            <span>
                                <input 
                                className='submitTaskBtn' 
                                type="submit" 
                                value="Submit Task"/>
                            </span>
                        </div>
                </form> }
            </div>
        </div>
    )
}

export default TasksTemplate
