import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


const ProjectModal = ({openModal, projName, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    const projTechArr = projTech.split(',')
    return (
        <div>
        <motion.div 
        className="modalBackdrop"
        initial={{opacity: 0}} 
        animate={{opacity: 0.90}} 
        transition={{duration: 0.5}}/>
        <motion.div 
        className="modal"
        initial={{scale: 0}} 
        animate={{scale: 1}}
        transition={{duration: 0.3}}>
            <div className="modalTitleLabelContainer">
                <span>{projName}</span>
            </div>
            <div className="modalContentContainer">
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Desc:</span>
                    <div className="modalLabelInnerBorder">
                        <p>{projPurpose}</p>
                    </div>
                </div>
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Technology Used:</span>
                    <div className="modalLabelInnerBorder">
                        {projTechArr.map((tech, idx) => {
                            return idx === projTechArr.length - 1 ? <span key={idx}>{tech}</span> : <span key={idx}>{tech}, </span>
                        })}
                    </div>
                </div>
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        <span>{projAoA}</span>
                    </div>
                </div>
            </div>
            <div className="ModalBtnContainer">
                <a 
                href={ProjSrcCode} 
                target="_blank" 
                rel="noreferrer"
                className="srcCodeBtnAnchorTag">
                    <button className="srcCodeBtn">Source Code</button>
                </a> 
                <button className="closeModalBtn" onClick={closeModal}>Close</button>
                <Link 
                to={{pathname: '/task'}}
                className="taskBtnLinkTag">
                    <button className="taskBtn">Task</button>
                </Link>
            </div>
        </motion.div>
        </div>
    )
}

export default ProjectModal
