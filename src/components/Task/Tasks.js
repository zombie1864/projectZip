import TasksTemplate from '../../templates/tasksTemplate/TasksTemplate'
import { validateTaskFormFields } from '../../validators/taskFormValidator'
import { useState } from 'react'


const Tasks = ({tasksState, setTasksState}) => {
    /**
    []_JSON data ex that needs to be sent to the backend API
    {
        "proj_id":"1",
        "task_idx":"0",
        "patch_update":{ NOTE user on the UI can either update `task_desc`, `proj_tags`, or `prio_lvl`
            "task_desc":"PATCH UPDATE ROUTE SUCCESS" NOTE when user performs update key:value pair are added to dict 
        }
    }
    |state〉
    〈setState|
    〈x|HTML〉
    〈HTML〉

    [x]_[SET DEFAULTVALUES AFTER ONCLICK EDIT LOGISTICS]:
        [x]_〈edit|button〉:: onClick[editTaskHandler]:
            [x]_editTaskHandler::{
                ''' 
                logistics to render defaultValues to HTML objects 
                The 〈button〉:: setATTR({value=task_id, data-selectedvalue=selectedValue, data-taskidx=idx})
                `btn setATTR(value)` <=> `〈HTML〉:: setATTR(value)`
                The funcRef will perform op to init defaultValues to HTML objs 
                NOTE e.trg.value:str 
                NOTE e.trg.dataset.selectedvalue:str
                NOTE e.trg.dataset.taskidx:str
                '''
                [x]_〈setTaskToEdit[parseInt(e.trg.value)]|
                [x]_〈setTaskDescDefaultValue[
                    tasksState[parseInt(e.trg.dataset.selectedvalue)].proj_tasks[parseInt(e.trg.dataset.taskidx)].task_desc
                ]|
                [x]_〈setProjTagsDefaultValue[
                    tasksState[parseInt(e.trg.dataset.selectedvalue)].proj_tasks[parseInt(e.trg.dataset.taskidx)].proj_tags.split('-')
                ]|
                [x]_〈setPrioLvlDefaultValue[
                    tasksState[parseInt(e.trg.dataset.selectedvalue)].proj_tasks[parseInt(e.trg.dataset.taskidx)].prio_lvl
                ]|
            }

    [x]_[RENDER UI CHANGES AFTER ONCLICK]:
        [x]_〈edit|button〉:: onClick => { 
            [x]_〈textbox〉:: recATTR(defaultValue=taskDescDefaultValue:str)
            `textbox recATTR(value)` <=> `HTML recATTR(value)`
            [x]_FOREACH::|tagsDefaultValue:List[str]〉=>〈input〉:: recATTR(tagDefaultValue:str)
            [x]_〈select::option〉:: recATTR(prioLvlDefaultValue:Dict[str,str].lvl)
            [x]_〈calender〉:: recATTR(prioLvlDefaultValue:Dict[str,str].due_date)
        }
    
    []_[HANDLE INPUT CHANGE TO TXT FIELDS]:
        []_〈textbox〉:: onChange[editInputHandler]:
            []_editInputHandler::{
                ''' 
                logistics to handle input changes to txtInput HTML el
                generic handler depending on e.trg.dataset.htmldesc
                '''
                []_IF[e.trg.dataset.htmldesc == 'taskDesc'] {
                    []_setInputChangeToTaskDesc[e.trg.value]
                }[]_ELIF[e.trg.dataset.htmldesc == 'proLvl'] {
                    []_setChangePrioLvl[e.trg.value]
                }[]_ELIF[e.trg.dataset.htmldesc == 'dueDate'] { 
                    []_setChangeDueDate[e.trg.value]
                }[]_ELSE {
                    []_setChangeTagDesc[e.trg.value]
                }
            }
    **/
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


    const submitTaskForm = event => {

        event.preventDefault()
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
            addData(taskToSubmit);
        } else {
            setMissingFields(validationResult) 
            if(validationResult.includes('taskDesc')) setTxtAreaTaskDescClassName('taskDescTextArea invalidInput')
            if(validationResult.includes('prioLvl')) setTaskPrioLvlClassName('taskPrioLvl invalidInput')
        }
    }


    const addData = async (dataToSubmit) => {
        const req = await fetch(
            'http://localhost:5000/tasks', 
            {
                method: 'POST', 
                headers: { 'Content-type': 'application/json' }, 
                body: JSON.stringify(dataToSubmit)
            }
        )
        const resp = await req.json() // sends back updated bd
        setTasksState(resp); 
    }

    
    const handleInputTag = event => {
        if (event.key === 'Enter') {
            setTags([...tags, inputTag])
            setInputTag('')
            event.preventDefault()
        }
    }
    
    
    const handleSelectedValue = event => setSelectedValue(parseInt(event.target.value))
    
    const handleInputTagChange = event => setInputTag(event.target.value)

    const handleSelectedPrio = event => setPrioLvl(event.target.value)

    const handleTaskDesc = event => setTaskDesc(event.target.value)

    const getDateHandler = event => {
        console.log('2nd');
        setDate(JSON.stringify(event.target.value)) // gets date ex: "2022-01-28T05:00:00.000Z"
        if (missingFields.includes('date')) {
            let idx = missingFields.indexOf('date')
            missingFields.splice(idx, 1)
            setMissingFields([])
        }
    }

    const toggleFrom = () => setDisplayForm(!displayForm)

    const editTaskHandler = e => { //user will have acc to edit task_desc, proj_tags, prio_lvl 
        /**
        @description: sets defaultValue after onClick `edit` logistics, setATTR to HTML el 
        **/
        setTaskIDToEdit(parseInt(e.target.value))
        setTaskIDXSelected(parseInt(e.target.dataset.taskidx))
        setTaskDescDefaultValue(
            tasksState[parseInt(e.target.dataset.selectedvalue)].proj_tasks[parseInt(e.target.dataset.taskidx)].task_desc
        )
        setProjTagsDefaultValue(
            tasksState[parseInt(e.target.dataset.selectedvalue)].proj_tasks[parseInt(e.target.dataset.taskidx)].proj_tags.split('-')
        ) //=> projTagsDefaultValue:List[str]
        setPrioLvlDefaultValue(
            tasksState[parseInt(e.target.dataset.selectedvalue)].proj_tasks[parseInt(e.target.dataset.taskidx)].prio_lvl.lvl
            ) //=> str
        setDueDateDefaultValue(new Date(tasksState[parseInt(e.target.dataset.selectedvalue)].proj_tasks[parseInt(e.target.dataset.taskidx)].prio_lvl.due_date))
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
        editTaskHandler
    )
}

export default Tasks
