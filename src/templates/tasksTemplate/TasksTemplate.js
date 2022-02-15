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

    let taskPrioLvl = lvl_desc => {
        return tasksState[selectedValue].proj_tasks.map((projTaskObj, idx) => {
            if (projTaskObj.prio_lvl.lvl === lvl_desc) {
                return <li key={idx}>{  projTaskObj.task_desc   }</li>
            } else {
                return null 
            }
        })
    }

    return (
        <div>
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
                        {   selectedValue !== undefined && <ul className='taskUl'>{ 
                                tasksState[selectedValue]["proj_tasks"].map(
                                    (task_obj, idx) => <li className='task_desc' key={idx}>{task_obj.task_desc}</li>)   }
                            </ul>   }
                    </td>
                    <td className='taskTableData'>
                        <p>Top Priority</p>
                        {   selectedValue !== undefined && <ul>{  taskPrioLvl('TOP')  }</ul>  }
                    </td>
                </tr>
                <tr className='taskTableRow'><td className='taskTableData'>
                    <p>End of Day (E.O.D)</p>
                    {   selectedValue !== undefined && <ul>{  taskPrioLvl('EOD') }</ul>  }
                </td></tr>
                <tr className='taskTableRow'><td className='taskTableData'>
                    <p>Upcoming</p>
                    {   selectedValue !== undefined && <ul>{  taskPrioLvl('upcoming')  }</ul>  }
                </td></tr>
            </tbody>
            </table>
            {   (displayForm && selectedValue === undefined) ? <span>Please Select a Project</span> :
                !displayForm ? null :
                <form className='addTaskForm' onSubmit={submitTaskForm}>
                    <textarea 
                    className={txtAreaTaskDescClassName} // NOTE if invalid input this changes CSS to indicate to user missing field
                    value={taskDesc}
                    onChange={handleTaskDesc}/>
                    { (missingFields.includes('date')) ? <span>YO add the date</span> : null }
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
