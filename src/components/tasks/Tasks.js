import TasksTemplate from '../../templates/tasksTemplate/TasksTemplate'
import { useState } from 'react'


const Tasks = ({tasksState}) => {
    const [selectedValue, setSelectedValue] = useState()

    const handleSelectedValue = event => {
        setSelectedValue(parseInt(event.target.value))
    }

    return TasksTemplate(
        tasksState,
        selectedValue,
        handleSelectedValue
    )
}

export default Tasks
