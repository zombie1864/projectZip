import {motion} from 'framer-motion'
import ProjectModalTemplate from './ProjectModalTemplate'
import '../../css/projBtns.css'


const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.25
      }
    }
};
  
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { opacity: 1 }
};

const ProjBtnsTemplate = (
    projectsState,
    openProjModal,
    projId,
    projName,
    projPurpose,
    projTech,
    projAoA,
    projSrcCode,
    projResources,
    editMode,
    renderNull,
    projectsStateEdited,
    renderNewProjectField,
    provideModalData,
    closeProjModal,
    enterEditMode, 
    deleteProjSection, 
    saveChangesToProjectsState,
    editProjSectionHandler,
    handleEditChanges,
    handleSelectedValue,
    addToProjResources
) => {
    /**
    @description: 
    @param {projectsState - state} 
    @param {openProjModal - state} 
    @param {projId - state} 
    @param {projName - state} 
    @param {projPurpose - state} 
    @param {projTec - state,} 
    @param {projAoA - state} 
    @param {projSrcCode - state} 
    **/
    return (
        <div>
            {projectsState.length !== 0 && 
                <motion.div 
                variants={container}
                initial='hidden'
                animate='visible'>
                    {projectsState.map( (project, projIdx) => {
                        return (
                            <div className='projBtnContainer' key={projIdx}>
                                <motion.button 
                                className='projBtns'
                                variants={item}
                                whileHover={{y:5.0}}
                                data-projidx={projIdx}
                                data-projid={project.proj_id} 
                                data-projname={project.proj_name}
                                data-projpurpose={project.proj_purpose}
                                data-projtech={project.proj_techs}
                                data-projaoa={project.proj_aoa}
                                data-projsrccode={project.proj_src_code}
                                data-projresources={project.proj_resources}
                                onClick={provideModalData}>
                                </motion.button>
                                <motion.p  
                                variants={item} 
                                className='projBtnTitle'>
                                    {project.proj_name}
                                </motion.p> 
                            </div>
                        )
                    })}
                </motion.div>
            }
            {
                ProjectModalTemplate(
                openProjModal, 
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
                closeProjModal,
                enterEditMode, 
                deleteProjSection, 
                saveChangesToProjectsState,
                editProjSectionHandler,
                handleEditChanges,
                handleSelectedValue,
                addToProjResources
                ) 
            }
        </div>
    )
}

export default ProjBtnsTemplate
