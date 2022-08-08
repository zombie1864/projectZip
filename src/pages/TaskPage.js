import React from 'react'
import { useState, useEffect } from 'react'
import { fetchData } from '../utils/http'
import Tasks from '../components/Task/Tasks'

const TaskPage = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
    const [tasksState, setTasksState] = useState([])

    useEffect( () => { // ~ componentDidMount, makes http req 
        const getTasksDataFromServer = async () => {
            const dataFromServer = await fetchData('http://localhost:8000/tasks')
            setTasksState(dataFromServer)
        }
        getTasksDataFromServer()
    }, [])


    return (
        <div className="taskPageContainer">
            <Tasks tasksState={tasksState} setTasksState={setTasksState}/>
        </div>
    )
}

export default TaskPage
