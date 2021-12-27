import React from 'react'

const DeleteProj = ({
    toggleDeletion, 
    arrOfProjToBeDeleted, 
    updateProjectsState, 
    submittedSuccesfulDeleteReq
}) => {

    const deleteRecordsFromDB = async () => {
        const deleteReq = await fetch(
            'http://localhost:5000/projects', 
            {
                method: 'DELETE', 
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(arrOfProjToBeDeleted)
            }
        )
        const updatedBackendData = await deleteReq.json()
        if (updatedBackendData) {
            updateProjectsState(updatedBackendData)
            submittedSuccesfulDeleteReq()
        }
    }


    return (
        <div>
            {
                arrOfProjToBeDeleted.length > 0 ? 
                <button
                onClick={deleteRecordsFromDB}
                className='addProjBtn'>Delete</button> :
                <button
                onClick={toggleDeletion}
                className='addProjBtn'>Delete Project(s)</button>
            }
        </div>
    )
}

export default DeleteProj
