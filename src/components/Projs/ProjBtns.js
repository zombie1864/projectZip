import React, { useState, useEffect } from 'react'
import ProjectModal from './ProjectModal'
// import { imgSlides } from '../../utils/slides'
import '../../css/projBtns.css'
import {motion} from 'framer-motion'
import{AiOutlineBars} from 'react-icons/ai'

const ProjBtns = () => {
    /**
    @description: Renders btns that user can click on to open modal for project detail information.
    **/
   const [projectsState, setProjectsState] = useState([]), 
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

    const addData = async () => {
        console.log('Clicked button');
        const res = await fetch(
            'http://localhost:5000/projects', 
            {
                method: 'POST', 
                headers: { 'Content-type': 'application/json' }, 
                body: JSON.stringify(
                    {
                        proj_name: 'FRONTEND DATA',
                        proj_desc: 'FRONTEND DATA',
                        proj_purpose: 'FRONTEND DATA',
                        proj_techs: 'FRONTEND DATA',
                        proj_aoa: 'FRONTEND DATA',
                        proj_src_code: 'srcCode'
                    }
                )
            }
        )
        const resp = await res.json()
        console.log(resp)
    }


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
                <button
                type='submit'
                variants={item} 
                onClick={addData}> 
                    Click Me
                </button>
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
            closeModal={() => setModalState(false)}>
            </ProjectModal>
            {/* <button
            type='submit'
            onClick={addData}> 
                Click Me
            </button> */}
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
        staggerChildren: 0.3
      }
    }
};
  
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { opacity: 1 }
};

export default ProjBtns
