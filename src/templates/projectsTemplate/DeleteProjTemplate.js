import React from 'react'
import {motion} from 'framer-motion'
import {MdOutlineDeleteSweep} from 'react-icons/md'
import '../../css/deleteBtns.css'


const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { opacity: 1 }
};


const DeleteProjTemplate = (
    projToBeDeleted, 
    toggleSelection4DeletionHandler, 
    deleteRecordsFromDB
) => {

    return (
        <div className='deleteBtns' style={{position: 'fixed', top: '127px'}}>
            {
                projToBeDeleted.length > 0 ? 
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
                    onClick={toggleSelection4DeletionHandler}
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

export default DeleteProjTemplate
