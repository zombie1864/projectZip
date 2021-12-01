import React from 'react'
import { useState, useEffect } from 'react'
import { fetchData } from '../utils/http'
import Tasks from '../components/tasks/Tasks'

const TaskPage = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
    const [tasksState, setTasksState] = useState([])

    useEffect( () => { // ~ componentDidMount, makes http req 
        const getTasksDataFromServer = async () => {
            const dataFromServer = await fetchData('http://localhost:5000/tasks')
            setTasksState(dataFromServer)
        }
        getTasksDataFromServer()
    }, [])


    return (
        <div className="taskPageContainer">
            <Tasks tasksState={tasksState}/>
        </div>
    )
}

export default TaskPage
