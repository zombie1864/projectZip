import TasksTemplate from '../../templates/tasksTemplate/TasksTemplate'
import { validateTaskFormFields } from '../../validators/taskFormValidator'
import { useState } from 'react'


const Tasks = ({tasksState, setTasksState}) => {
    const [selectedValue, setSelectedValue] = useState(), 
    [displayForm, setDisplayForm] = useState(false),
    [date, setDate] = useState(),
    [inputTag, setInputTag] = useState(''), 
    [tags, setTags] = useState([]),
    [prioLvl, setPrioLvl] = useState(),
    [taskDesc, setTaskDesc] = useState(),
    [txtAreaTaskDescClassName, setTxtAreaTaskDescClassName] = useState('taskDescTextArea'),
    [taskPrioLvlClassName, setTaskPrioLvlClassName] = useState('taskPrioLvl'),
    [missingFields, setMissingFields] = useState([]),
    [taskIDToEdit, setTaskIDToEdit] = useState(),
    [taskIDXSelected, setTaskIDXSelected] = useState(),
    [taskDescDefaultValue, setTaskDescDefaultValue] = useState(),
    [projTagsDefaultValue, setProjTagsDefaultValue] = useState(),
    [prioLvlDefaultValue, setPrioLvlDefaultValue] = useState(), 
    [dueDateDefaultValue, setDueDateDefaultValue] = useState()


    const submitTaskForm = e => {
        /**
        @description: 
            []_after〈onClick|"Submit Task"|button〉calls funcRef validateTaskFormFields to validate state of interest 
            []_saves state to obj to be transmitted to backend API 
            []_IF[not validation] setMissingFieldsState 
        **/
        e.preventDefault()
        let taskToSubmit = null
        let validationResult = validateTaskFormFields(taskDesc, date, prioLvl) //=>Arr[str]
        if(validationResult.length === 0) {
            taskToSubmit = {
                "task_desc": taskDesc,
                "due_date": date.slice(1,11),
                "prio": prioLvl, 
                "proj_tags": tags.join('-'),
                "proj_id": selectedValue + 1
            }
            httpTransmit(taskToSubmit, 'POST');
        } else {
            setMissingFields(validationResult) 
            if(validationResult.includes('taskDesc')) setTxtAreaTaskDescClassName('taskDescTextArea invalidInput')
            if(validationResult.includes('prioLvl')) setTaskPrioLvlClassName('taskPrioLvl invalidInput')
        }
    }


    const httpTransmit = async (dataToSubmit, reqType) => {
        /**
        @description: handles HTTP RESTful lifecycle and resets state after succ state transfer 
        @param {dataToSubmit} Obj: contains data that is to be transmitted to server 
        @param {reqType} str: requestType, determines which CRUD method is performed on server's API 
         !!! RFE !!!: see if you can opt this func
        **/
        if (reqType === 'POST') {
            const req = await fetch(
                'http://localhost:5000/tasks', 
                {
                    method: reqType, 
                    headers: { 'Content-type': 'application/json' }, 
                    body: JSON.stringify(dataToSubmit)
                }
            )
            const resp = await req.json() // sends back updated bd
            // reset states 
            setTasksState(resp); 
            setDisplayForm(!displayForm)
            setTaskDesc()
            setDate()
            setPrioLvl()
            setTags([])
        } else if (reqType === 'PATCH') {
            const req = await fetch(
                'http://localhost:5000/tasks', 
                {
                    method: reqType, 
                    headers: { 'Content-type': 'application/json' }, 
                    body: JSON.stringify(dataToSubmit)
                }
            )
            const resp = await req.json() // sends back updated bd
            setTasksState(resp) 
            setTaskIDXSelected()
            setTaskDesc()
            setDate()
            setPrioLvl()
            setTags([])
        } else if (reqType === 'DELETE') {
            const req = await fetch(
                'http://localhost:5000/tasks', 
                {
                    method: reqType, 
                    headers: { 'Content-type': 'application/json' }, 
                    body: JSON.stringify(dataToSubmit)
                }
            )
            const resp = await req.json() // sends back updated bd
            setTasksState(resp) 
        }
    }

    
    const handleInputTag = e => {
        if (e.key === 'Enter') {
            setTags([...tags, inputTag])
            setInputTag('')
            e.preventDefault()
        }
    }
    
    
    const handleSelectedValue = e => { 
        if (displayForm) setDisplayForm(!displayForm)
        setSelectedValue(parseInt(e.target.value)) 
    }
    
    const handleInputTagChange = e => setInputTag(e.target.value)

    const handleSelectedPrio = e => setPrioLvl(e.target.value)

    const handleTaskDesc = e => setTaskDesc(e.target.value)

    const getDateHandler = e => {
        /**
        @description: setState for Date:str 
        **/
        setDate(JSON.stringify(e.target.value)) // gets date ex: "2022-01-28T05:00:00.000Z"
        if (missingFields.includes('date')) {
            let idx = missingFields.indexOf('date')
            missingFields.splice(idx, 1)
            setMissingFields([])
        }
    }


    const toggleFrom = () => setDisplayForm(!displayForm)


    const editTaskHandler = e => { 
        /**
        @description: 
            []_sets defaultValue after onClick `edit` logistics, setATTR to HTML el 
            []_responsible for triggering UI changes.〈onClick|"Edit"|button〉<=> "edit mode"
        **/
        let idx = parseInt(e.target.dataset.selectedvalue)
        let taskIdx = parseInt(e.target.dataset.taskidx)
        setTaskIDToEdit(taskIdx)
        setTaskIDXSelected(taskIdx)
        setTaskDescDefaultValue(tasksState[idx].proj_tasks[taskIdx].task_desc)
        setProjTagsDefaultValue(tasksState[idx].proj_tasks[taskIdx].proj_tags.split('-')) //=> projTagsDefaultValue:List[str]
        setPrioLvlDefaultValue(tasksState[idx].proj_tasks[taskIdx].prio_lvl.lvl) //=> str
        setDueDateDefaultValue(new Date(tasksState[idx].proj_tasks[taskIdx].prio_lvl.due_date))
    }


    const editInputHandler = e => {
        /**
        @description: setState depending on HTTML.el.dataset.ATTR  
        **/
        if (e.target.dataset.htmldesc === 'taskDesc') {
            setTaskDesc(e.target.value)
        } else if (e.target.dataset.htmldesc === 'tag') {
            projTagsDefaultValue.splice(parseInt(e.target.dataset.tagidx), 1, e.target.value)
            setTags(projTagsDefaultValue) //List[str]
        } else if (e.target.dataset.htmldesc === 'proLvl') {
            setPrioLvl(e.target.value)
        } 
    }


    const deleteHandler = e => {
        httpTransmit({"task_id":e.target.value}, 'DELETE')
    }


    const saveChanges = () => {
        /**
        @description: 
            []_after〈onClick|"Save Button"|button〉saves state to an Obj to be transmitted to backend. 
            []_Contains IF[cond] as validator 
        **/
        let editedObj = {
            "proj_id": tasksState[selectedValue].proj_id,
            "task_idx": taskIDToEdit, 
            "patch_update": {}
        }
        if (taskDesc) editedObj.patch_update["task_desc"] = taskDesc
        if (tags.length > 0) editedObj.patch_update["proj_tags"] = tags.join('-')
        if (date) editedObj.patch_update["due_date"] = date.slice(1,11)
        if (prioLvl) editedObj.patch_update["prio"] = prioLvl
        if (Object.keys(editedObj.patch_update).length > 0 ) httpTransmit(editedObj, 'PATCH')
    }


    return TasksTemplate(
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
    )
}

export default Tasks
