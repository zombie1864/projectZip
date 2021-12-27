import React from 'react'
import AddProjForm from '../components/Projs/AddProjForm'
import ProjBtns from '../components/Projs/ProjBtns'
import '../css/projectPage.css'
import { useState, useEffect } from 'react'
import { fetchData } from '../utils/http'

const ProjectsPage = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page as well as the application logic of the projectsPage view layer. The application logic will perform and contain all the logic that is going to be shared across each component on the view layer. On componentDidMount, api call is made - fetch backend data. 
    **/
   const [projectsState, setProjectsState] = useState([]),
   [modalState, setModalState] = useState(false),
   [addProjModalState, setAddProjModalState] = useState(false),
   [proj_img, setProj_img] = useState()
   
   useEffect( () => { // ~ componentDidMount, makes http req 
       const getProjsDataFromServer = async () => {
           const projectsDataFromServer = await fetchData('http://localhost:5000/projects')
           setProjectsState(projectsDataFromServer)
       }
       getProjsDataFromServer()
   }, [])
   

    const updateProjectsState = updatedBackendData => setProjectsState(updatedBackendData)

    const toggleModal = () => setModalState(!modalState)
    
    const toggleAddProjModal = () => setAddProjModalState(!addProjModalState)


    const receiveImg = async () => {
        const upload_img_req = await fetch(
            'http://localhost:5000/projects', 
            {
                method: 'GET', 
                headers: {'Content-Type': 'X-custom-header'}
            }
        )
        const img_resp = await upload_img_req.blob()
        setProj_img(URL.createObjectURL(img_resp))
    }

    return (
        <div className="projectPage">
            <h3 className="pageTitleProject">
                Projects<span> - View or add new projects</span>
            </h3>
            <div>
                <ProjBtns 
                openProjModal={modalState}
                projectsState={projectsState}
                toggleModal={toggleModal}/>
                <AddProjForm 
                openAddNewProjModal={addProjModalState}
                closeAddNewProjModal={toggleAddProjModal}
                updateProjectsState={updateProjectsState}/>
                {/* <span>Add Image</span>
                <button onClick={receiveImg}>Get Image</button>
                {
                    proj_img && 
                    <img src={proj_img} alt='project img should be here'/>
                } */}
            </div>
        </div>
    )
}

export default ProjectsPage

