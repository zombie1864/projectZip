import React from 'react'
import '../../css/taskPage.css'
import { CalendarComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';

const TasksTemplate = (
    tasksState, // props.state
    displayForm, // comp.state 
    selectedValue, 
    inputTag,
    tags,
    taskDesc,
    missingFields,
    txtAreaTaskDescClassName,
    taskPrioLvlClassName,
    taskIDXSelected,
    taskDescDefaultValue,
    projTagsDefaultValue,
    prioLvlDefaultValue,
    dueDateDefaultValue,
    handleSelectedValue, // comp.handlers 
    toggleFrom,
    getDateHandler,
    submitTaskForm,
    handleInputTagChange,
    handleInputTag,
    handleSelectedPrio,
    handleTaskDesc,
    editTaskHandler,
    editInputHandler,
    saveChanges,
    deleteHandler
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
            <h1 className='pageTitle_tasks'>Tasks - View Tasks for a Selected Project</h1>
            <div className='addCancelTaskBtnContainer'>
                {   displayForm && selectedValue !== undefined ? 
                    <button onClick={toggleFrom}>CANCEL</button> : 
                    <button className='addTaskBtn' onClick={toggleFrom}>Add Task</button>  }
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
                                    (task_obj, idx) => {
                                        return <div key={idx}>
                                                    <li className='task_desc'>{task_obj.task_desc}</li>
                                                    {/* WARNING-value can only be str:dt */}
                                                    <button 
                                                    onClick={editTaskHandler}
                                                    data-selectedvalue={selectedValue}
                                                    data-taskidx={idx}
                                                    >EDIT</button> 
                                                    <button
                                                    value={task_obj.task_id}
                                                    onClick={deleteHandler}>DELETE</button>
                                                    {   (taskIDXSelected === idx && taskDescDefaultValue) && 
                                                        <textarea 
                                                        defaultValue={taskDescDefaultValue}
                                                        data-htmldesc='taskDesc'
                                                        onChange={editInputHandler}/>
                                                    }
                                                    {   (taskIDXSelected === idx && projTagsDefaultValue) && 
                                                        projTagsDefaultValue.map(
                                                            (projTag, idx) => <input 
                                                                                key={idx} 
                                                                                data-htmldesc='tag'
                                                                                data-tagidx={idx}
                                                                                defaultValue={projTag}
                                                                                onChange={editInputHandler}/>
                                                        )
                                                    }
                                                    {   (taskIDXSelected === idx && prioLvlDefaultValue) && 
                                                    <div>
                                                        <span>Select Prio lvl</span>
                                                        <select 
                                                        defaultValue={prioLvlDefaultValue} 
                                                        onChange={editInputHandler} 
                                                        className={taskPrioLvlClassName}
                                                        data-htmldesc='proLvl'> 
                                                            <option value='TOP'>Top</option>
                                                            <option value='EOD'>End of Day</option>
                                                            <option value='upcoming'>Upcoming</option>
                                                        </select>
                                                    </div>
                                                    }
                                                    {   (taskIDXSelected === idx && prioLvlDefaultValue) && 
                                                        <DatePickerComponent 
                                                        value={dueDateDefaultValue} 
                                                        onChange={getDateHandler}/>
                                                    }
                                                    {   taskIDXSelected === idx && <button onClick={saveChanges}>Save Changes</button>  }
                                                    <div>{  (taskIDXSelected === idx && projTagsDefaultValue) ? null :
                                                    task_obj.proj_tags.split('-').map( (tag, idx) => <p key={idx}>{tag}</p>) }  </div>
                                                </div>     })   }  </ul>   }
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
                        <option value='TOP'>Top</option>
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
