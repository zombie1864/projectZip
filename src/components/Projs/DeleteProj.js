import React from 'react'
import {motion} from 'framer-motion'
import {MdOutlineDeleteSweep} from 'react-icons/md'
import '../../css/deleteBtns.css'


const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { opacity: 1 }
};


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
        <div className='deleteBtns'>
            {
                arrOfProjToBeDeleted.length > 0 ? 
                <div className='projBtnContainer'>
                    <button
                    variants={item}
                    onClick={deleteRecordsFromDB}
                    className='deleteProjBtn'
                    style={{
                        position: 'relative', 
                        top: '19px'
                    }}>
                        <span className='projBtnIcon'>{<MdOutlineDeleteSweep/>}</span>
                    </button>
                    <p
                    variants={item} 
                    className='projBtnTitle'
                    style={{position: 'relative', top: '19px'}}>Delete</p>
                </div> :
                <div className='projBtnContainer'>
                    <motion.button
                    variants={item}
                    whileHover={{y:-15.0}} 
                    onClick={toggleDeletion}
                    className='addProjBtn'
                    style={{
                        position: 'relative', 
                        top: '19px'
                    }}>
                        <motion.span className='projBtnIcon'>
                            {<MdOutlineDeleteSweep/>}
                        </motion.span>
                    </motion.button>
                    <motion.p  
                    variants={item} 
                    className='projBtnTitle'
                    style={{position: 'relative', top: '19px'}}>
                        Delete Project(s)
                    </motion.p> 
                </div>
            }
        </div>
    )
}

export default DeleteProj
