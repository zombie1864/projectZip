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
       [projIdx, setProjIdx] = useState(),
       [editMode, setEditMode] = useState(false),
       [renderNull, setRenderNull] = useState([]),
       [projectsStateEdited, setProjectsStateEdited] = useState()
    

    const provideModalData = (event) => {
        toggleModal()
        setProjId(event.currentTarget.dataset.projid)
        setProjName(event.currentTarget.dataset.projname)
        setProjPurpose(event.currentTarget.dataset.projpurpose)
        setProjTech(event.currentTarget.dataset.projtech)
        setProjAoA(event.currentTarget.dataset.projaoa)
        setProjSrcCode(event.currentTarget.dataset.projsrccode)
        setProjResources(event.currentTarget.dataset.projresources)
        setProjIdx(parseInt(event.target.dataset.projidx))
        setProjectsStateEdited(projectsState) // NOTE refer to footnote _1.
    }


    const closeProjModal = () => toggleModal()


    const enterEditMode = () => setEditMode(true)


    const deleteProjSection = event => {
        setRenderNull([...renderNull, event.target.value])
        let projToEditObj = projectsStateEdited[projIdx]
        projToEditObj[event.target.value] = ''
        setProjectsStateEdited(projectsStateEdited)
    }


    const saveChangesToProjectsState = event => { // send PUT http req to the server
        let dataToSubmit = projectsStateEdited[event.target.value]
        dataToSubmit['mode'] = 'delete'
        const patchData = async (dataToSubmit) => {
            const patchReq = await fetch(
                'http://localhost:5000/projects', 
                {
                    method: 'PUT', 
                    headers: {'Content-type': 'application/json'}, 
                    body: JSON.stringify(dataToSubmit)
                }
            )
            const resp = await patchReq.json()
            console.log(resp);
        }
        patchData(dataToSubmit)
    }

    
    return ProjBtnsTemplate(
        projectsState, // props.state
        openProjModal,
        projIdx, // comp.state 
        projId, 
        projName,
        projPurpose,
        projTech,
        projAoA,
        projSrcCode,
        projResources,
        editMode,
        renderNull,
        provideModalData, // comp.handlers
        closeProjModal,
        enterEditMode, 
        deleteProjSection, 
        saveChangesToProjectsState
    )
}

export default ProjBtns

/**
    _1. For security reasons it is better to have a copy of projectsState to avoid giving to much data to the dataset attr in the html template 
        ⮑ a user can inspect the information - which is bad design. Some basic information is fine but not too much 
**/