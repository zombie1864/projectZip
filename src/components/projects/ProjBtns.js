import React, {useState} from 'react'
import ProjectModal from './ProjectModal'
import '../../css/projBtns.css'
import { pyProjects } from '../../utils/pyProjMetaData'

const ProjBtns = () => {
    /**
    @description: Renders btns that user can click on to open modal for project detail information.
    **/
    const [modalState, setModalState] = useState(false),
          [projId, setProjId] = useState(),
          [projTitle, setProjTitle] = useState(),
          [projPurpose, setProjPurpose] = useState(),
          [projTech, setProjTech] = useState(),
          [projAoA, setProjAoA] = useState(),
          [projSrcCode, setProjSrcCode] = useState()

    const toggleModal = (event) => {
        setModalState(true)
        setProjId(event.currentTarget.dataset.projid)
        setProjTitle(event.currentTarget.dataset.projtitle)
        setProjPurpose(event.currentTarget.dataset.projpurpose)
        setProjTech(event.currentTarget.dataset.projtech)
        setProjAoA(event.currentTarget.dataset.projaoa)
        setProjSrcCode(event.currentTarget.dataset.projsrccode)
    }
    return (
        <div>
            {pyProjects.map( project => {
                return (
                    <div style={{
                        display: 'inline-block',
                        }}>
                    <button 
                    key={project.id}
                    className='projBtns'
                    data-projid={project.id} 
                    data-projtitle={project.title}
                    data-projpurpose={project.purpose}
                    data-projtech={project.technologyUsed}
                    data-projaoa={project.AoA}
                    data-projsrccode={project.srcCode}
                    onClick={toggleModal}>
                        <span className='projBtnIcon'>{project.icon}</span>
                    </button>
                    <p className='projBtnTitle'>{project.title}</p>
                    </div>
                )
            })}
            <ProjectModal 
            openModal={modalState} 
            projId={projId}
            projTitle={projTitle}
            projPurpose={projPurpose}
            projTech={projTech}
            projAoA={projAoA}
            ProjSrcCode={projSrcCode}
            closeModal={() => setModalState(false)}>
            </ProjectModal>
        </div>
    )
}

export default ProjBtns
