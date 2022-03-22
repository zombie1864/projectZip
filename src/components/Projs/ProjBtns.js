import { useState } from 'react'
import ProjBtnsTemplate from '../../templates/projectsTemplate/ProjBtnsTemplate'

const ProjBtns = ({openProjModal, projectsState, toggleModal, updateProjectsState}) => {
    /**
    @description: Renders btns that user can click on to open modal for project detail information. This component state is used for the projModal 
    @param {openProjModal - props.state} Boolean: bool which toggles between open/closeModal
    @param {projectsState - props.state} Array[Objects]: each obj contains data abt a proj 
    @param {toggleModal - props.handlers} e_handler: toggle openProjModal state 
    **/
   const [projId, setProjId] = useState(),
       [projName, setProjName] = useState(),
       [projDesc, setProjDesc] = useState(),
       [projPurpose, setProjPurpose] = useState(),
       [projTech, setProjTech] = useState(),
       [projAoA, setProjAoA] = useState(),
       [projSrcCode, setProjSrcCode] = useState(),
       [projResources, setProjResources] = useState(), 
       [editMode, setEditMode] = useState(false),
       [renderNull, setRenderNull] = useState([]),
       [projectsStateEdited, setProjectsStateEdited] = useState({editProjSegment: [], inputChanges: ''}), 
       [renderNewProjectField, setRenderNewProjectField] = useState([]),
       [renderSelection4Deletion, setRenderSelection4Deletion] = useState(false), 
       [projToBeDeleted, setProjToBeDeleted] = useState([])
    

    const provideModalData = (e) => {
        toggleModal()
        setProjId(e.currentTarget.dataset.projid)
        setProjName(e.currentTarget.dataset.projname)
        setProjDesc(e.currentTarget.dataset.projdesc)
        setProjPurpose(e.currentTarget.dataset.projpurpose)
        setProjTech(e.currentTarget.dataset.projtech)
        setProjAoA(e.currentTarget.dataset.projaoa)
        setProjSrcCode(e.currentTarget.dataset.projsrccode)
        setProjResources(e.currentTarget.dataset.projresources)
        setProjectsStateEdited({
            ...projectsStateEdited, 
            proj_id: parseInt(e.target.dataset.projidx) + 1
        }) 
    }


    const closeProjModal = () => {
        toggleModal()
        setProjName()
        setProjDesc()
        setProjPurpose()
        setProjTech()
        setProjAoA()
        setProjSrcCode()
        setProjResources()
        setEditMode(false)
        setRenderNull([])
        setProjectsStateEdited({editProjSegment:[], inputChanges:''})
        setRenderNewProjectField([])
    }


    const enterEditMode = () => setEditMode(true)


    const deleteProjSection = e => { 
        if (e.target.value.includes('resources')) {
            let resourceIdx = parseInt(e.target.value.substring(15,e.target.value.length))
            let proj_resources_dataset = projResources.split(',')

            proj_resources_dataset.splice(resourceIdx,1,'null')
            setProjectsStateEdited({
                ...projectsStateEdited, 
                proj_resources: proj_resources_dataset
            })
            setProjResources(proj_resources_dataset.join(','))
        } else {
            setRenderNull([...renderNull, e.target.value])
            setProjectsStateEdited({
                ...projectsStateEdited, 
                [e.target.value]: ''
            })
        }
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


    const editProjSectionHandler = e => {
        setProjectsStateEdited({
            ...projectsStateEdited,
            editProjSegment: [...projectsStateEdited.editProjSegment, e.target.value]
        })
    }


    const handleEditChanges = e => {
        if (e.target.dataset.nameofprojsectionforediting.includes('resources')) {
            let idx = parseInt(
                e.target.dataset.nameofprojsectionforediting.substring(
                    15, e.target.dataset.nameofprojsectionforediting.length
                )
            )
            let projResourcesEdited = projResources.split(',')
            projResourcesEdited[idx] = e.target.value
            // console.log(projResourcesEdited);
            setProjectsStateEdited({
                ...projectsStateEdited, 
                proj_resources: projResourcesEdited
            })
            setProjResources(projResourcesEdited.join(','))
        } else {
            setProjectsStateEdited({
                ...projectsStateEdited, 
                [e.target.dataset.nameofprojsectionforediting] : e.target.value
            })
        }
    }


    const handleSelectedValue = e => {
        if (!renderNewProjectField.includes(e.target.value)) {
            setRenderNewProjectField([
                ...renderNewProjectField, 
                e.target.value
            ])
        }
    }


    const addToProjResources = () => setProjResources(projResources + ',Click "Edit" to Edit New Resource')


    const toggleSelection4DeletionHandler = () => setRenderSelection4Deletion(true)


    const stageProj4DeletionHandler = e => {
        /**
        @description: 
            []_〈onClick|`circleIcon`|input::checkbox〉:: {
                []_IF[user clicks on `circleIcon` to check a proj] {
                    []_projToBeDeleted.remove(e.trg.value)
                }[]_ELSE {
                    []_〈setProjToBeDeleted|projToBeDeleted〉
                }
            }
        **/
        if (projToBeDeleted.includes(parseInt(e.target.value))) {
            projToBeDeleted.splice(projToBeDeleted.indexOf(parseInt(e.target.value)), 1)
            setProjToBeDeleted([...projToBeDeleted]) 
        } else {
            setProjToBeDeleted([...projToBeDeleted, parseInt(e.target.value)])
        }
    }


    const submittedSuccesfulDeleteReq = () => {
        setRenderSelection4Deletion(false)
        setProjToBeDeleted([])
    }

    const deleteRecordsFromDB = async () => {
        const deleteReq = await fetch(
            'http://localhost:5000/projects', 
            {
                method: 'DELETE', 
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(projToBeDeleted)
            }
        )
        const updatedBackendData = await deleteReq.json()
        if (updatedBackendData) {
            updateProjectsState(updatedBackendData)
            submittedSuccesfulDeleteReq()
        }
    }
    
    return ProjBtnsTemplate(
        projectsState, // props.state
        openProjModal,
        projId, // comp.state 
        projName,
        projDesc,
        projPurpose,
        projTech,
        projAoA,
        projSrcCode,
        projResources,
        editMode,
        renderNull,
        projectsStateEdited,
        renderNewProjectField,
        renderSelection4Deletion,
        projToBeDeleted,
        provideModalData, // comp.handlers
        closeProjModal,
        enterEditMode, 
        deleteProjSection, 
        saveChangesToProjectsState,
        editProjSectionHandler,
        handleEditChanges,
        handleSelectedValue,
        addToProjResources,
        toggleSelection4DeletionHandler, 
        stageProj4DeletionHandler,
        deleteRecordsFromDB
    )
}

export default ProjBtns