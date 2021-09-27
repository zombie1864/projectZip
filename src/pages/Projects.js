import React, {useState} from 'react'
import{AiOutlineBars} from 'react-icons/ai'
import Modal from '../components/Modal'

const Projects = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
   const [modalState, setModalState] = useState(false)
    return (
        <div className="projects">
            {pyProjects.map( project => {
                return (
                    <div>
                        <button onClick={() => setModalState(true)} style={{backgroundColor:'orange'}} key={project.id}><span>{project.icon}</span>{project.txt}</button>
                        <Modal openModal={modalState} onClose={() => setModalState(false)}>{project.txt}</Modal>
                    </div>
                )
            })}
        </div>
    )
}

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