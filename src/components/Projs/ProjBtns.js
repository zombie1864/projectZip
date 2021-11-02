import React, { useState, useEffect } from 'react'
import ProjectModal from './ProjectModal'
import AddProjForm from './AddProjForm'
import '../../css/projBtns.css'
import {motion} from 'framer-motion'
import{AiOutlineBars} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

const ProjBtns = () => {
    /**
    @description: Renders btns that user can click on to open modal for project detail information.
    **/
   const [projectsState, setProjectsState] = useState([]), 
       [addProjModalState, setAddProjModalState] = useState(false),
       [modalState, setModalState] = useState(false),
       [projId, setProjId] = useState(),
       [projName, setProjName] = useState(),
       [projPurpose, setProjPurpose] = useState(),
       [projTech, setProjTech] = useState(),
       [projAoA, setProjAoA] = useState(),
       [projSrcCode, setProjSrcCode] = useState()


    const fetchProjectsData  = async () => {
        // console.log('SEC');
        const res = await fetch('http://localhost:5000/projects')
        const projectsData = await res.json()
        return projectsData
    }
    
    useEffect( () => {
        // console.log('FIRST');
        const getProjectsData = async () => {
            const projectsDataFromServer = await fetchProjectsData()
            setProjectsState(projectsDataFromServer)
        }
        getProjectsData()
    }, [])
    

    const toggleModal = (event) => {
        // console.log('BUG');
        setModalState(true)
        setProjId(event.currentTarget.dataset.projid)
        setProjName(event.currentTarget.dataset.projname)
        setProjPurpose(event.currentTarget.dataset.projpurpose)
        setProjTech(event.currentTarget.dataset.projtech)
        setProjAoA(event.currentTarget.dataset.projaoa)
        setProjSrcCode(event.currentTarget.dataset.projsrccode)
    }

    const toggleAddModalForm = () => setAddProjModalState(true)

    const propagateChildData = childData => setProjectsState(childData)

    return (
        <div>
            {/* {console.log('THIRD')} */}
            {projectsState.length !== 0 && 
                <motion.div 
                variants={container}
                initial='hidden'
                animate='visible'>
                    {projectsState.map( (project, idx) => {
                        return (
                            <div className='projBtnContainer' key={idx}>
                                <motion.button 
                                className='projBtns'
                                variants={item}
                                whileHover={{y:5.0}}
                                data-projid={project.proj_id} 
                                data-projname={project.proj_name}
                                data-projpurpose={project.proj_purpose}
                                data-projtech={project.proj_techs}
                                data-projaoa={project.proj_aoa}
                                data-projsrccode={project.proj_src_code}
                                onClick={toggleModal}>
                                    <motion.span className='projBtnIcon'>{<AiOutlineBars/>}</motion.span>
                                </motion.button>
                                <motion.p  
                                variants={item} 
                                className='projBtnTitle'>
                                    {project.proj_name}
                                </motion.p> 
                            </div>
                        )
                    })}
                <div className='projBtnContainer'>
                    <motion.button
                    variants={item} 
                    whileHover={{y:5.0}}
                    onClick={toggleAddModalForm}
                    className='projBtns'> 
                        <motion.span className='projBtnIcon'>{<MdPlaylistAdd/>}</motion.span>
                    </motion.button>
                    <motion.p  
                    variants={item} 
                    className='projBtnTitle'>
                        Add New Project
                    </motion.p> 
                </div>
                </motion.div>
            }
            <ProjectModal 
            openModal={modalState} 
            projId={projId}
            projName={projName}
            projPurpose={projPurpose}
            projTech={projTech}
            projAoA={projAoA}
            ProjSrcCode={projSrcCode}
            closeModal={() => setModalState(false)}/>
            <AddProjForm
            openModal={addProjModalState}
            cbFuncDataProp={propagateChildData} // NOTE this is an adv tech make sure to doc well 
            closeModal={() => setAddProjModalState(false)}/>
        </div>
    )
}

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

export default ProjBtns
