import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'


const ProjectModal = ({openModal, projTitle, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    return (
        <motion.div 
        className="modalBackdrop"
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        transition={{duration: 0.5}}>
        <motion.div 
        className="modal"
        initial={{scale: 0}} 
        animate={modalAnimation}>
            {projTitle}
            {projPurpose}
            {projTech}
            {projAoA}
            {ProjSrcCode}
            <button onClick={closeModal}>Close Modal</button>
        </motion.div>
        </motion.div>
    )
}

export default ProjectModal


const modalAnimation = {
    scale: 1,
    x: -100,
    y: 0,
}