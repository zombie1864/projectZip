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
       [projSrcCode, setProjSrcCode] = useState()
    

    const provideModalData = (event) => {
        toggleModal()
        setProjId(event.currentTarget.dataset.projid)
        setProjName(event.currentTarget.dataset.projname)
        setProjPurpose(event.currentTarget.dataset.projpurpose)
        setProjTech(event.currentTarget.dataset.projtech)
        setProjAoA(event.currentTarget.dataset.projaoa)
        setProjSrcCode(event.currentTarget.dataset.projsrccode)
    }

    const closeProjModal = () => toggleModal()

    
    return ProjBtnsTemplate(
        projectsState, // props.state
        openProjModal,
        projId, // comp.state
        projName,
        projPurpose,
        projTech,
        projAoA,
        projSrcCode,
        provideModalData, // comp.handlers
        closeProjModal,
    )
}

export default ProjBtns
