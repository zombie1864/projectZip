import React, {useState} from 'react'
import{AiOutlineBars} from 'react-icons/ai'
import ProjectModal from '../components/ProjectModal'

const Projects = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
   const [modalState, setModalState] = useState(false)
   const [projId, setProjId] = useState()
   const [modelTxt, setModelTxt] = useState()
   const toggleModal = (event) => {
       console.log(event.currentTarget.dataset.projectid);
       setModalState(true)
       setProjId(event.currentTarget.dataset.projectid)
       setModelTxt(event.currentTarget.dataset.projectdesc)
   }
    return (
        <div className="projects">
            {pyProjects.map( project => {
                return (
                    <div key={project.id}>
                        <button 
                        data-projectid={project.id} 
                        data-projectdesc={project.txt}
                        onClick={toggleModal} 
                        style={{backgroundColor:'orange'}} >
                            {project.icon}
                            {project.txt}
                        </button>
                    </div>
                )
            })}
            <ProjectModal 
            openModal={modalState} 
            projId={projId}
            modelTxt={modelTxt}
            onClose={() => setModalState(false)}>
            </ProjectModal>
        </div>
    )
}
// isolate modal and btn into its own modal - remember this is just the page 
export default Projects


const pyProjects = [
    {
        id: 1, 
        txt: 'loream ipsum',
        icon: <AiOutlineBars/>
    },
    {
        id: 2, 
        txt: 'loream ipsum 2',
        icon: <AiOutlineBars/>
    },
    {
        id: 3, 
        txt: 'loream ipsum 3',
        icon: <AiOutlineBars/>
    },
]