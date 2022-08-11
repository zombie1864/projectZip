import React from 'react'
import '../../css/taskPage.css'
// import { CalendarComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


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
    calanderValue,
    handleSelectedValue, // comp.handlers 
    toggleFrom,
    submitTaskForm,
    handleInputTagChange,
    handleInputTag,
    handleSelectedPrio,
    handleTaskDesc,
    editTaskHandler,
    editInputHandler,
    saveChanges,
    deleteHandler,
    setCalanderValue
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
            {/* jsxElStart: page title */}
                <h1 className='pageTitle_tasks'>Tasks - View Tasks for a Selected Project</h1>
            {/* jsxElEnd: page title */}
            {/* jsxElStart: add task/ cancel task button */}
                <div className='addCancelTaskBtnContainer'>
                    {   displayForm && selectedValue !== undefined ? 
                        <button className="cancelTaskBtn" onClick={toggleFrom}>CANCEL</button> : 
                        <button className='addTaskBtn' onClick={toggleFrom}>Add Task</button>  }
                </div>
            {/* jsxElEnd: add task/ cancel task button */}
            <div className="taskTableAndFormContainer">
            <table className={  selectedValue === undefined ? 'defaultTaskTable' : 'taskTable'  }>
            <tbody>
                <tr className='taskTableRow'>
                    {/* jsxElStart: first column on UI */}
                        <td rowSpan="3" className='taskTableData'>
                            {/* jsxElStart: drop down list */}
                                <select className="selectDropDown" defaultValue={'none'} onChange={handleSelectedValue}>
                                    <option value='none' disabled hidden>-Select A Project-</option>
                                    {   tasksState.map((taskObj, idx) => <option key={idx} value={idx}>{taskObj.proj_name}</option>)    }
                                </select>
                            {/* jsxElEnd: drop down list */}
                            {   selectedValue !== undefined && <ul className='taskUl'>{ 
                                    tasksState[selectedValue]["proj_tasks"].map(
                                        (task_obj, idx) => {
                                            return <div key={idx} className='taskLiContainer'>
                                                        {/* jsxElStart: task desc */}
                                                            <li className='task_desc'>➤ {task_obj.task_desc}</li>
                                                        {/* jsxElEnd: task desc */}
                                                        {/* WARNING-value can only be str:dt */}
                                                        <button className='taskEditBtn'
                                                            onClick={editTaskHandler}
                                                            data-selectedvalue={selectedValue}
                                                            data-taskidx={idx}>EDIT
                                                        </button> 
                                                        <button className='taskDelBtn'
                                                            value={task_obj.task_id}
                                                            onClick={deleteHandler}>DELETE
                                                        </button>
                                                        {/* jsxElStart: textarea when editing the task desc */}
                                                            {   (taskIDXSelected === idx && taskDescDefaultValue) && 
                                                                <textarea 
                                                                defaultValue={taskDescDefaultValue}
                                                                data-htmldesc='taskDesc'
                                                                onChange={editInputHandler}/>
                                                            }
                                                        {/* jsxElEnd: textarea when editing the task desc */}
                                                        {/* jsxElStart: input when editing the proj tags */}
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
                                                        {/* jsxElEnd: input when editing the proj tags */}
                                                        {/* jsxElStart: dropdown option when editing proj prioLvl */}
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
                                                        {/* jsxElEnd: dropdown option when editing proj prioLvl */}
                                                        {/* jsxElStart: calander component when editing task due date */}
                                                            {   (taskIDXSelected === idx && prioLvlDefaultValue) && 
                                                                <Calendar 
                                                                defaultValue={dueDateDefaultValue}
                                                                onChange={setCalanderValue}/>
                                                            }
                                                        {/* jsxElEnd: calander component when editing task due date */}
                                                        {   taskIDXSelected === idx && <button onClick={saveChanges}>Save Changes</button>  }
                                                        {/* jsxElStart: render tags */}
                                                            <div className="taskTagsOuterContainer">
                                                                <p className="taskTagsLbl">Task Tags:</p>
                                                                <div className="taskTagsContainer">
                                                                    {  (taskIDXSelected === idx && projTagsDefaultValue) ? null :
                                                                        task_obj.proj_tags.split('-').map( 
                                                                            (tag, idx) => <div key={idx} className="taskTagWrapper">
                                                                                            <p className="taskTag">{tag}</p>
                                                                                        </div>
                                                                        ) 
                                                                    }  
                                                                </div>
                                                            </div>
                                                        {/* jsxElEnd: render tags */}
                                                    </div>     
                                            })   }  
                            </ul>}
                        </td>
                    {/* jsxElEnd: first column on UI */}
                        {/* jsxElStart: second column on UI */}
                            <td className='taskTableData'>
                                <div className="topPrioTitle"><p>Top Priority</p></div>
                                {   selectedValue !== undefined && <ul className="topUlTask">{  taskPrioLvl('TOP')  }</ul>  }
                            </td>
                </tr>
                            <tr className='taskTableRow'>
                                <td className='taskTableData'>
                                    <div className="eodPrioTitle"><p>End of Day (E.O.D)</p></div>
                                    {   selectedValue !== undefined && <ul className="eodUlTask">{  taskPrioLvl('EOD') }</ul>  }
                                </td>
                            </tr>
                            <tr className='taskTableRow'>
                                <td className='taskTableData'>
                                    <div className="upcomingPrioTitle"><p>Upcoming</p></div>
                                    {   selectedValue !== undefined && <ul className="upcomingUlTask">{  taskPrioLvl('upcoming')  }</ul>  }
                                </td>
                            </tr>
                        {/* jsxElEnd: second column on UI */}
            </tbody>
            </table>
            {/* jsxElStart: form displayed when adding new task / errMsg when user attempts to add task without selecting a project */}
                {   (displayForm && selectedValue === undefined) ? 
                    <span>Please Select a Project</span> :
                    !displayForm ? null :
                    <form className='addTaskForm' onSubmit={submitTaskForm}>
                        <textarea 
                        className={txtAreaTaskDescClassName} // NOTE if invalid input this changes CSS to indicate to user missing field
                        value={taskDesc}
                        onChange={handleTaskDesc}/>
                        {   (missingFields.includes('date')) ? <span>Please add a date</span> : null    }
                        <Calendar onChange={setCalanderValue} value={calanderValue}/>
                        {   tags.length > 0 && tags }
                        <input
                        type="text"
                        value={inputTag}
                        className='taskTagInput'
                        onChange={handleInputTagChange}
                        onKeyDown={handleInputTag}
                        placeholder="Add a tag"/>
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
                    </form> 
                }
            {/* jsxElEnd: form displayed when adding new task / errMsg when user attempts to add task without selecting a project */}
            </div>
        </div>
    )
}

export default TasksTemplate
