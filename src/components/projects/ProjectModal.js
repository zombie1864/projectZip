import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'


const ProjectModal = ({openModal, projTitle, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    return (
        <div>
        <motion.div 
        className="modalBackdrop"
        initial={{opacity: 0}} 
        animate={{opacity: 0.90}} 
        transition={{duration: 0.5}}>
        </motion.div>
        <motion.div 
        className="modal"
        initial={{scale: 0}} 
        animate={modalAnimation}
        transition={{duration: 0.3}}>
            <div className="modalTitleLabelContainer">
                <span>{projTitle}</span>
            </div>
            <div className="modalLabelContainer">
                <div className="modalLabelOutterBorder">
                    <span className="modalLabels">Desc:</span>
                    <div className="modalLabelInnerBorder">
                        <p>{projPurpose}</p>
                    </div>
                </div>
                <div className="modalLabelOutterBorder">
                    <span className="modalLabels">Technology Used:</span>
                    <div className="modalLabelInnerBorder">
                        <p>{projTech}</p>
                    </div>
                </div>
                <div className="modalLabelOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        <p>{projAoA}</p>
                    </div>
                </div>
            </div>
            <div className="closeModalBtnContainer">
                {/* For the sorce code you might need to use an ancher tah `a` tag instead */}
                <button className="srcCodeBtn">Source Code</button> 
                <button className="closeModalBtn" onClick={closeModal}>Close</button>
                <button className="taskBtn">Task</button>
            </div>
        </motion.div>
        </div>
    )
}

export default ProjectModal


const modalAnimation = {
    scale: 1,
}
