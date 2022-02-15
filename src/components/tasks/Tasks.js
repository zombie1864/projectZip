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
    [missingFields, setMissingFields] = useState([]) 


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
        console.log(dataToSubmit);
        // const req = await fetch(
        //     'http://localhost:5000/tasks', 
        //     {
        //         method: 'POST', 
        //         headers: { 'Content-type': 'application/json' }, 
        //         body: JSON.stringify(dataToSubmit)
        //     }
        // )
        // const resp = await req.json() // sends back updated bd
        // setTasksState(resp); 
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


    return TasksTemplate(
        tasksState,
        displayForm,
        selectedValue,
        inputTag,
        tags,
        taskDesc,
        missingFields,
        txtAreaTaskDescClassName,
        taskPrioLvlClassName,
        handleSelectedValue,
        toggleFrom,
        getDateHandler,
        submitTaskForm,
        handleInputTagChange,
        handleInputTag,
        handleSelectedPrio,
        handleTaskDesc
    )
}

export default Tasks
