import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


const ProjectModalTemplate = (
    openProjModal, // props.state
    projIdx,
    projName,  
    projPurpose,  
    projTech,  
    projAoA,  
    projResources, 
    projSrcCode,  
    editMode, 
    renderNull, 
    closeProjModal, //props.func
    enterEditMode, 
    deleteProjSection, 
    saveChangesToProjectsState
    ) => { 
    const renderEditModeBtns = (editMode, projSection) => {
        return (
            <div>
                {
                    editMode && 
                    <div>
                        <button>Edit</button>
                        <button
                        data-proidx={projIdx}
                        value={projSection}
                        onClick={deleteProjSection}>Delete</button>
                    </div>
                }
            </div>
        )
    }


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
                {renderEditModeBtns(editMode)}
            </div>
            <div className="modalContentContainer">
                { !renderNull.includes('proj_purpose') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Purpose:</span>
                    <div className="modalLabelInnerBorder">
                        <p>{projPurpose}</p>
                        {renderEditModeBtns(editMode, 'proj_purpose')}
                    </div>
                </div>
                }
                { !renderNull.includes('proj_techs') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Technology Used:</span>
                    <div className="modalLabelInnerBorder">
                        {
                            projTech.split(',').map((tech, idx) => {
                                return idx === projTech.split(',').length - 1 ? <span key={idx}>{tech}</span> : <span key={idx}>{tech}, </span>
                            })
                        }
                        {renderEditModeBtns(editMode, 'proj_techs')}
                    </div>
                </div>
                }
                { !renderNull.includes('proj_aoa') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        <span>{projAoA}</span>
                        {renderEditModeBtns(editMode, 'proj_aoa')}
                    </div>
                </div>
                }
                {
                (projResources.split(',').length > 0 && projResources.split(',')[0] !== '') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Project Resources:</span> 
                    <div className="modalLabelInnerBorder">
                        <ul>
                            {projResources.split(',').map((resource, idx) => {
                                return (
                                <li key={idx}>
                                    {resource} 
                                    {renderEditModeBtns(editMode, 'projResources')}
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                }
                {
                    editMode ? 
                    <button
                    value={projIdx}
                    onClick={saveChangesToProjectsState}>Save Changes</button> : 
                    <button
                    onClick={enterEditMode}>Edit Mode</button>
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
                onClick={closeProjModal}>{editMode ? 'Cancel' : 'Close'}</button>
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
