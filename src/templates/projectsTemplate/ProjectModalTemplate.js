import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


const ProjectModalTemplate = (
    openProjModal, 
    projName, 
    projPurpose, 
    projTech, 
    projAoA, 
    projResources,
    projSrcCode, 
    closeProjModal
    ) => { 
    return (
        <div>
        {
        !openProjModal ? null : 
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
                        {
                            projTech.split(',').map((tech, idx) => {
                                return idx === projTech.split(',').length - 1 ? <span key={idx}>{tech}</span> : <span key={idx}>{tech}, </span>
                            })
                        }
                    </div>
                </div>
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        <span>{projAoA}</span>
                    </div>
                </div>
                {
                (projResources.split(',').length > 0 && projResources.split(',')[0] !== '') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Project Resources:</span> 
                    <div className="modalLabelInnerBorder">
                        <ul>
                            {projResources.split(',').map((resource, idx) => {
                                return (
                                <li key={idx}>{resource}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                }
            </div>
            <div className="ModalBtnContainer">
                <a 
                href={projSrcCode} 
                target="_blank" 
                rel="noreferrer"
                className="srcCodeBtnAnchorTag">
                    <button className="srcCodeBtn">Source Code</button>
                </a> 
                <button 
                className="closeModalBtn" 
                onClick={closeProjModal}>Close</button>
                <Link 
                to={{pathname: '/tasks'}}
                className="taskBtnLinkTag">
                    <button className="taskBtn">Task</button>
                </Link>
            </div>
        </motion.div>
        </div>
        }
        </div>
    )
}

export default ProjectModalTemplate
