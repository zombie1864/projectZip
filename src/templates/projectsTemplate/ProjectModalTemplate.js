import React from 'react'
import '../../css/projModal.css'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


const ProjectModalTemplate = (
    openProjModal, // props.state
    projName,  
    projPurpose,  
    projTech,  
    projAoA,  
    projResources, 
    projSrcCode,  
    editMode, 
    renderNull, 
    projectsStateEdited,
    closeProjModal, //props.func
    enterEditMode, 
    deleteProjSection, 
    saveChangesToProjectsState,
    editProjSectionHandler,
    handleEditChanges
    ) => { 
    const renderEditModeBtns = (editMode, projSection) => {
        return (
            <div>
                {
                    editMode && 
                    <div>
                        <button
                        value={projSection}
                        onClick={editProjSectionHandler}>Edit</button>
                        <button
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
                        {
                        projectsStateEdited.editProjSegment.includes('proj_purpose') ? 
                        <textarea
                        type='text'
                        defaultValue={projPurpose}
                        data-nameofprojsectionforediting='proj_purpose'
                        onChange={handleEditChanges}/> :
                        <p>{projPurpose}</p>
                        }
                        {renderEditModeBtns(editMode, 'proj_purpose')}
                    </div>
                </div>
                }
                { !renderNull.includes('proj_techs') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Technology Used:</span>
                    <div className="modalLabelInnerBorder">
                        { 
                        projectsStateEdited.editProjSegment.includes('proj_techs') ? 
                        <textarea
                        type='text'
                        defaultValue={projTech}
                        data-nameofprojsectionforediting='proj_techs'
                        onChange={handleEditChanges}/> : 
                        <span>{projTech}</span>
                        }
                        {renderEditModeBtns(editMode, 'proj_techs')}
                    </div>
                </div>
                }
                { !renderNull.includes('proj_aoa') && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        {
                        projectsStateEdited.editProjSegment.includes('proj_aoa') ? 
                        <textarea
                        type='text'
                        defaultValue={projAoA}
                        data-nameofprojsectionforediting='proj_aoa'
                        onChange={handleEditChanges}/> :
                        <span>{projAoA}</span>
                        }
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
                                if (resource === 'null') return null 
                                return (
                                <li key={idx}>
                                    {
                                    projectsStateEdited.editProjSegment.includes(`proj_resources_${idx}`) ? 
                                    <input
                                    type='text'
                                    defaultValue={resource}
                                    data-nameofprojsectionforediting={`proj_resources_${idx}`}
                                    onChange={handleEditChanges}/> : 
                                    resource
                                    } 
                                    {renderEditModeBtns(editMode, `proj_resources_${idx}`)}
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
