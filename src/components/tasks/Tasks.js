import TasksTemplate from '../../templates/tasksTemplate/TasksTemplate'
import { useState } from 'react'


const Tasks = ({tasksState}) => {
    const [selectedValue, setSelectedValue] = useState(), 
    [displayForm, setDisplayForm] = useState(false),
    [date, setDate] = useState(),
    [inputTag, setInputTag] = useState(''), 
    [tags, setTags] = useState([]),
    [prioLvl, setPrioLvl] = useState()


    const submitTaskForm = event => {
        event.preventDefault()
        const taskToSubmit = {
            "task_desc": "doing more for 2",
            "due_date": date,
            "prio": prioLvl, 
            "proj_tags": tags,
            "proj_id": selectedValue + 1
        }
        console.log(taskToSubmit);
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

    const getDateHandler = event => setDate(JSON.stringify(event.target.value)) // onClick gets date ex: "2022-01-28T05:00:00.000Z"

    const toggleFrom = () => setDisplayForm(!displayForm)


    return TasksTemplate(
        tasksState,
        displayForm,
        selectedValue,
        inputTag,
        tags,
        handleSelectedValue,
        toggleFrom,
        getDateHandler,
        submitTaskForm,
        handleInputTagChange,
        handleInputTag,
        handleSelectedPrio
    )
}

export default Tasks
