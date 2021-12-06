import {motion} from 'framer-motion'
import{AiOutlineBars} from 'react-icons/ai'
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
    provideModalData,
    closeProjModal,
    enterEditMode, 
    deleteProjSection, 
    saveChangesToProjectsState,
    editProjSectionHandler,
    handleEditChanges
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
                                    {/* WARNING when user clicks on this icon the projidx is undefined however outside the icon the projidx is defined - you need to have it such that the icon can be here without iterfering with onClick event handler  */}
                                    {/* <motion.span className='projBtnIcon'>{<AiOutlineBars/>}</motion.span> */} 
                                    {/* WARNING */}
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
                closeProjModal,
                enterEditMode, 
                deleteProjSection, 
                saveChangesToProjectsState,
                editProjSectionHandler,
                handleEditChanges
                ) 
            }
        </div>
    )
}

export default ProjBtnsTemplate
