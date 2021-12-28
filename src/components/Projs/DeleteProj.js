import React from 'react'
import {MdOutlineDeleteSweep} from 'react-icons/md'

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
                <div className='projBtnContainer'>
                    <button
                    onClick={toggleDeletion}
                    className='addProjBtn'>
                        <span
                        className='projBtnIcon'>
                            {<MdOutlineDeleteSweep/>}
                        </span>
                    </button>
                    <p className='projBtnTitle'>Delete Project(s)</p>
                </div>
            }
        </div>
    )
}

export default DeleteProj
