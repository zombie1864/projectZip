import { useState } from 'react'
import ProjBtnsTemplate from '../../templates/projectsTemplate/ProjBtnsTemplate'

const ProjBtns = ({openProjModal, projectsState, toggleModal}) => {
    /**
    @description: Renders btns that user can click on to open modal for project detail information. This component state is used for the projModal 
    @param {openProjModal - props.state} Boolean: bool which toggles between open/closeModal
    @param {projectsState - props.state} Array[Objects]: each obj contains data abt a proj 
    @param {toggleModal - props.handlers} Event_handler: toggle openProjModal state 
    **/
   const [projId, setProjId] = useState(),
       [projName, setProjName] = useState(),
       [projPurpose, setProjPurpose] = useState(),
       [projTech, setProjTech] = useState(),
       [projAoA, setProjAoA] = useState(),
       [projSrcCode, setProjSrcCode] = useState(),
       [projResources, setProjResources] = useState([]), 
       [editMode, setEditMode] = useState(false),
       [renderNull, setRenderNull] = useState([]),
       [projectsStateEdited, setProjectsStateEdited] = useState({
           editProjSegment: [], 
           inputChanges: ''
       })
    

    const provideModalData = (event) => {
        toggleModal()
        setProjId(event.currentTarget.dataset.projid)
        setProjName(event.currentTarget.dataset.projname)
        setProjPurpose(event.currentTarget.dataset.projpurpose)
        setProjTech(event.currentTarget.dataset.projtech)
        setProjAoA(event.currentTarget.dataset.projaoa)
        setProjSrcCode(event.currentTarget.dataset.projsrccode)
        setProjResources(event.currentTarget.dataset.projresources)
        setProjectsStateEdited({
            ...projectsStateEdited, 
            proj_id: parseInt(event.target.dataset.projidx) + 1
        }) 
    }


    const closeProjModal = () => toggleModal()


    const enterEditMode = () => setEditMode(true)


    const deleteProjSection = event => {
        setRenderNull([...renderNull, event.target.value])
        setProjectsStateEdited({
            ...projectsStateEdited, 
            [event.target.value]: ''
        })
    }


    const saveChangesToProjectsState = () => { // send PUT http req to the server
        let dataToSubmit = projectsStateEdited
        delete dataToSubmit.editProjSegment
        delete dataToSubmit.inputChanges
        const patchData = async (dataToSubmit) => {
            const patchReq = await fetch(
                'http://localhost:5000/projects', 
                {
                    method: 'PUT', 
                    headers: {'Content-type': 'application/json'}, 
                    body: JSON.stringify(dataToSubmit)
                }
            )
            const updatedDataSet = await patchReq.json()
            return updatedDataSet
        }
        patchData(dataToSubmit)
        window.location.reload()
        // console.log(dataToSubmit);
    }


    const editProjSectionHandler = event => {
        setProjectsStateEdited({
            ...projectsStateEdited,
            editProjSegment: [...projectsStateEdited.editProjSegment, event.target.value]
        })
    }


    const handleEditChanges = event => {
        setProjectsStateEdited({
            ...projectsStateEdited, 
            [event.target.dataset.nameofprojsectionforediting] : event.target.value
        })
    }

    
    return ProjBtnsTemplate(
        projectsState, // props.state
        openProjModal,
        projId, // comp.state 
        projName,
        projPurpose,
        projTech,
        projAoA,
        projSrcCode,
        projResources,
        editMode,
        renderNull,
        projectsStateEdited,
        provideModalData, // comp.handlers
        closeProjModal,
        enterEditMode, 
        deleteProjSection, 
        saveChangesToProjectsState,
        editProjSectionHandler,
        handleEditChanges
    )
}

export default ProjBtns