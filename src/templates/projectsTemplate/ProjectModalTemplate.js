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
    renderNewProjectField,
    closeProjModal, //props.func
    enterEditMode, 
    deleteProjSection, 
    saveChangesToProjectsState,
    editProjSectionHandler,
    handleEditChanges,
    handleSelectedValue,
    addToProjResources
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
                { !renderNull.includes('proj_name') && 
                <div>
                    {
                        projectsStateEdited.editProjSegment.includes('proj_name') ?
                        <input
                        type='text'
                        defaultValue={projName}
                        data-nameofprojsectionforediting='proj_name'
                        onChange={handleEditChanges}/> :
                        <span 
                        data-nameofprojsectionforediting='proj_name'>{projName}</span>
                    }
                </div>
                }
                {renderEditModeBtns(editMode, 'proj_name')}
            </div>
            <div className="modalContentContainer">
                { (
                    (projPurpose !== '' && !renderNull.includes('proj_purpose')) || 
                    renderNewProjectField.includes('proj_purpose')
                ) && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Purpose:</span>
                    <div className="modalLabelInnerBorder">
                        {
                        projectsStateEdited.editProjSegment.includes('proj_purpose') ? 
                        <textarea
                        type='text'
                        defaultValue={
                            renderNewProjectField.includes('proj_purpose') ? 
                            null : projPurpose
                        }
                        data-nameofprojsectionforediting='proj_purpose'
                        onChange={handleEditChanges}/> :
                        <p>{
                            renderNewProjectField.includes('proj_purpose') ? 
                            'Add Project Purpose' : projPurpose
                        }</p>
                        }
                        {renderEditModeBtns(editMode, 'proj_purpose')}
                    </div>
                </div>
                }
                { (
                    (projTech !== '' && !renderNull.includes('proj_techs')) || 
                    renderNewProjectField.includes('proj_techs')
                ) && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Technology Used:</span>
                    <div className="modalLabelInnerBorder">
                        { 
                        projectsStateEdited.editProjSegment.includes('proj_techs') ? 
                        <textarea
                        type='text'
                        defaultValue={
                            renderNewProjectField.includes('proj_techs') ? 
                            null : projTech
                        }
                        data-nameofprojsectionforediting='proj_techs'
                        onChange={handleEditChanges}/> : 
                        <span>{
                            renderNewProjectField.includes('proj_techs') ? 
                            'Add Project Technologies' : projTech
                        }</span>
                        }
                        {renderEditModeBtns(editMode, 'proj_techs')}
                    </div>
                </div>
                }
                { (
                    (projAoA !== '' && !renderNull.includes('proj_aoa')) || 
                    renderNewProjectField.includes('proj_aoa')
                ) && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Area of Application:</span> 
                    <div className="modalLabelInnerBorder">
                        {
                        projectsStateEdited.editProjSegment.includes('proj_aoa') ? 
                        <textarea
                        type='text'
                        defaultValue={
                            renderNewProjectField.includes('proj_aoa') ? 
                            null : projAoA
                        }
                        data-nameofprojsectionforediting='proj_aoa'
                        onChange={handleEditChanges}/> :
                        <span>{
                            renderNewProjectField.includes('proj_aoa') ? 
                            'Add Project Purpose' : projAoA
                        }</span>
                        }
                        {renderEditModeBtns(editMode, 'proj_aoa')}
                    </div>
                </div>
                }
                {(
                    (projResources.split(',').length > 0 && projResources.split(',')[0] !== '') ||
                    renderNewProjectField.includes('proj_resources')
                ) && 
                <div className="modalSubContainerOutterBorder">
                    <span className="modalLabels">Project Resources:</span> 
                    <div className="modalLabelInnerBorder">
                        {
                            editMode && 
                            <button
                            onClick={addToProjResources}>Add Project Resource</button>
                        }
                        <ul>
                            {projResources.split(',').map((resource, idx) => {
                                if (resource === 'null') return null 
                                return (
                                <li key={idx}>
                                    {
                                    projectsStateEdited.editProjSegment.includes(`proj_resources_${idx}`) ? 
                                    <input
                                    type='text'
                                    defaultValue={
                                        renderNewProjectField.includes('proj_resources') ? 
                                        null : resource
                                    }
                                    data-nameofprojsectionforediting={`proj_resources_${idx}`}
                                    onChange={handleEditChanges}/> : 
                                    renderNewProjectField.includes('proj_resources') ? 'New Project Resource' : resource
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
                {
                    editMode && 
                    <div>
                        <select 
                        onChange={handleSelectedValue}
                        defaultValue={'All Project Fields Are Available'}>
                            <option 
                            value='All Project Fields Are Available' 
                            disabled>{
                                projPurpose !== '' && projTech !== '' &&
                                projAoA !== '' && projResources.length !== 0 ? 
                                'All Project Fields Are Available' : 
                                '-Add Project Field-'
                            }</option>
                            {projPurpose === '' && 
                                <option
                                value={'proj_purpose'}>Add Project Purpose</option>
                            }
                            {projTech === '' && 
                                <option
                                value={'proj_techs'}>Add Project Technologies</option>
                            }
                            {projAoA === '' && 
                                <option
                                value={'proj_aoa'}>Add Project Area of Application</option>
                            }
                            {projResources.length === 0 && 
                                <option
                                value={'proj_resources'}>Add Project Resources</option>
                            }
                        </select>
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
