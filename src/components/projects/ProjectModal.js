import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'


const ProjectModal = ({openModal, projTitle, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    return (
        <motion.div 
        className="modalBackdrop"
        initial={{opacity: 0}} 
        animate={{opacity: 0.90}} 
        transition={{duration: 0.5}}>
        <motion.div 
        className="modal"
        initial={{scale: 0}} 
        animate={modalAnimation}>
            <span>{projTitle}</span>
            <p><span>Desc: </span>{projPurpose}</p>
            <p><span>Technology Used: </span>{projTech}</p>
            <p><span>Area of Application: </span>{projAoA}</p>
            <p><span>Source Code: </span>{ProjSrcCode}</p>
            <button onClick={closeModal}>Close Modal</button>
        </motion.div>
        </motion.div>
    )
}

export default ProjectModal


const modalAnimation = {
    scale: 1,
}

const variants = {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  };