import React from 'react'
import '../../css/taskPage.css'
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
    taskTagsDefaultValue,
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

            {/* jsxElStart: task comp which includes add task btn, task table, and task form */}
            <div className="taskCompContainer">

            {/* jsxElStart: add task/ cancel task button */}
                <div className='addCancelTaskBtnContainer'>
                    {   displayForm && selectedValue !== undefined ? 
                        <button className="cancelTaskBtn" onClick={toggleFrom}>CANCEL</button> : 
                        <button className='addTaskBtn' onClick={toggleFrom}>Add Task</button>  }
                </div>
            {/* jsxElEnd: add task/ cancel task button */}
            
            {/* jsxElStart: renders table and form */}
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
                                                let editMode = taskIDXSelected === idx 
                                                return <div id={    editMode ? 'editTask' : undefined    } 
                                                            key={idx} 
                                                            className='taskLiContainer'>
                                                            {/* jsxElStart: task desc */}
                                                                <li className='task_desc'>➤ {task_obj.task_desc}</li>
                                                            {/* jsxElEnd: task desc */}

                                                            {/* jsxElStart: Edit button to edit task fields */}
                                                            {/* WARNING-value can only be str:dt */}
                                                                <button className={
                                                                        editMode ? 'cancelTaskEditBtn' : 'taskEditBtn'   
                                                                    }
                                                                    onClick={editTaskHandler}
                                                                    data-selectedvalue={selectedValue}
                                                                    data-taskidx={idx}>{    editMode ? 'CANCEL' : 'EDIT'    }
                                                                </button> 
                                                            {/* jsxElEnd: Edit button to edit task fields */}

                                                            {/* jsxElStart: Delete button to delete task on UI and backend */}
                                                                <button className='taskDelBtn'
                                                                    value={task_obj.task_id}
                                                                    onClick={deleteHandler}>DELETE
                                                                </button>
                                                            {/* jsxElEnd: Delete button to delete task on UI and backend */}

                                                            {/* jsxElStart: textarea when editing the task desc */}
                                                                {   (editMode && taskDescDefaultValue) && 
                                                                    <textarea 
                                                                    className="editTaskDescTxtArea"
                                                                    defaultValue={taskDescDefaultValue}
                                                                    data-htmldesc='taskDesc'
                                                                    onChange={editInputHandler}/>
                                                                }
                                                            {/* jsxElEnd: textarea when editing the task desc */}

                                                            {/* jsxElStart: calander component when editing task due date */}
                                                                {   (editMode && taskTagsDefaultValue) && 
                                                                        <Calendar 
                                                                        className="editCalendarValue"
                                                                        defaultValue={dueDateDefaultValue}
                                                                        onChange={setCalanderValue}/>
                                                                }
                                                            {/* jsxElEnd: calander component when editing task due date */}

                                                            {/* jsxElStart: input tags when editing the task tags */}
                                                            {   (editMode && projTagsDefaultValue) && 
                                                                <div className="editTagsDivContainer">
                                                                <span className="taskTagsEditLbl">Task Tags: </span>
                                                                    <div className="editTagsContainer">
                                                                        {   projTagsDefaultValue.map(
                                                                                (projTag, idx) => <input 
                                                                                                    className="editTaskTag"
                                                                                                    key={idx} 
                                                                                                    data-htmldesc='tag'
                                                                                                    data-tagidx={idx}
                                                                                                    defaultValue={projTag}
                                                                                                    onChange={editInputHandler}/>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                            {/* jsxElEnd: input tags when editing the task tags */}

                                                            {/* jsxElStart: dropdown option when editing proj prioLvl */}
                                                                {   (editMode && taskTagsDefaultValue) && 
                                                                <div className="editPrioLvlContainer">
                                                                    <span className="editPrioLvlLbl">Select Priority Level: </span>
                                                                    <select 
                                                                        id="editPrioLvlSelectTag"
                                                                        defaultValue={taskTagsDefaultValue} 
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

                                                            {/* jsxElStart: save button that saves changes made to a task via edit */}
                                                                {   editMode && 
                                                                    <button className="saveTaskEdit" onClick={saveChanges}>Save Changes</button>  }
                                                            {/* jsxElEnd: save button that saves changes made to a task via edit */}
                                                            
                                                            {/* jsxElStart: render tags and handles editing logic */}
                                                                { task_obj.proj_tags.length > 0 ?
                                                                    <div className="taskTagsOuterContainer">
                                                                        {   editMode ? null : 
                                                                            <p className="taskTagsLbl">Task Tags:</p>
                                                                        }
                                                                        <div className="taskTagsContainer">
                                                                            {  (editMode && projTagsDefaultValue) ? null : // when usr clicks to edit, hides the rendered tags
                                                                                task_obj.proj_tags.split('-').map( 
                                                                                    (tag, idx) => <div key={idx} className="taskTagWrapper">
                                                                                                    <p className="taskTag">{tag}</p>
                                                                                                </div>
                                                                                ) 
                                                                            }  
                                                                        </div>
                                                                    </div> : 
                                                                    <div>{/* provides default spacing when no tags are present */}<br/></div>
                                                                }
                                                            {/* jsxElEnd: render tags and handles editing logic */}

                                                        </div>     
                                                })   }  
                                </ul>}
                            </td>
                        {/* jsxElEnd: first column on UI */}

                            {/* jsxElStart: second column on UI */}
                                {   selectedValue !== undefined &&
                                    <td className='taskTableData'>
                                        <div className="topPrioTitle"><p>Top Priority</p></div>
                                        <ul className="topUlTask">{  taskPrioLvl('TOP')  }</ul> 
                                    </td>
                                }
                    </tr>
                                {   selectedValue !== undefined && 
                                    <tr className='taskTableRow'>
                                        <td className='taskTableData'>
                                            <div className="eodPrioTitle"><p>End of Day (E.O.D)</p></div>
                                            <ul className="eodUlTask">{  taskPrioLvl('EOD') }</ul> 
                                        </td>
                                    </tr>
                                }
                                {   selectedValue !== undefined && 
                                    <tr className='taskTableRow'>
                                        <td className='taskTableData'>
                                            <div className="upcomingPrioTitle"><p>Upcoming</p></div>
                                            <ul className="upcomingUlTask">{  taskPrioLvl('upcoming')  }</ul> 
                                        </td>
                                    </tr>
                                }
                            {/* jsxElEnd: second column on UI */}

                </tbody>
                </table>
                {/* jsxElStart: form displayed when adding new task / errMsg when user attempts to add task without selecting a project */}
                    {   (displayForm && selectedValue === undefined) ? 
                        <span>Please Select a Project</span> :
                        !displayForm ? null :
                        <form className='addTaskForm' onSubmit={submitTaskForm}>
                            {/* jsxElStart: textarea to input desc of new task */}
                                <textarea 
                                id="newTaskDescTextArea"
                                className={txtAreaTaskDescClassName} // NOTE if invalid input this changes CSS to indicate to user missing field
                                value={taskDesc}
                                onChange={handleTaskDesc}/>
                            {/* jsxElEnd: textarea to input desc of new task */}

                            {   (missingFields.includes('date')) ? <span>Please add a date</span> : null    }

                            {/* jsxElStart: 3rd party calendar component */}
                                <Calendar className="addTaskCalendar" onChange={setCalanderValue} value={calanderValue}/>
                            {/* jsxElEnd: 3rd party calendar component */}

                            {/* jsxElStart: conditional rendering of inputted tags by the usr */}
                                <div className="inputTagsContainer">
                                    {   tags.length > 0 && tags.map(
                                            (tag, idx) => <span className="inputtedTag" key={idx}>{tag}</span>
                                        ) }
                                </div>
                            {/* jsxElEnd: conditional rendering of inputted tags by the usr */}
                            
                            {/* jsxElStart: input field for tags and dropdown selection container */}
                                <div className="tagsAndTaskPrioLvlContainer">
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
                                </div>
                            {/* jsxElEnd: input field for tags and dropdown selection container */}
                            
                            {/* jsxElStart: submit button which sends to backend new task */}
                                <div className='submitTaskBtnContainer'>
                                    <span>
                                        <input 
                                        className='submitTaskBtn' 
                                        type="submit" 
                                        value="Submit Task"/>
                                    </span>
                                </div>
                            {/* jsxElEnd: submit button which sends to backend new task */}

                        </form> 
                    }
                {/* jsxElEnd: form displayed when adding new task / errMsg when user attempts to add task without selecting a project */}
                </div>
            {/* jsxElEnd: renders table and form */}

            </div>
            {/* jsxElEnd: task comp which includes add task btn, task table, and task form */}
        </div>
    )
}

export default TasksTemplate
