import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


const ProjectModal = ({openModal, projTitle, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    const projTechStrToArray = projTech => projTech.split(',')
    const projTechArr = projTechStrToArray(projTech)
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
                        {projTechArr.map((tech, idx) => <p key={idx}>{tech}</p>)}
                    </div>
                </div>
                <div className="modalLabelOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        <p>{projAoA}</p>
                    </div>
                </div>
                <div className="closeModalBtnContainer">
                    <button className="srcCodeBtn">
                        <a 
                        href={ProjSrcCode} 
                        target="_blank" 
                        rel="noreferrer"
                        className="srcCodeBtnAnchorTag">Source Code</a> 
                    </button>
                    <button className="closeModalBtn" onClick={closeModal}>Close</button>
                    <button className="taskBtn">
                        <Link 
                        to={{pathname: '/task'}}
                        className="taskBtnLinkTag">Task</Link>
                    </button>
                </div>
            </div>
        </motion.div>
        </div>
    )
}

export default ProjectModal


const modalAnimation = {
    scale: 1,
}
