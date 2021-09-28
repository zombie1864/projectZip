import React from 'react'
import '../../css/projModal.css'


const ProjectModal = ({openModal, projTitle, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    return (
        <div className="modalOverlay">
        <div className="modal">
            {projTitle}
            {projPurpose}
            {projTech}
            {projAoA}
            {ProjSrcCode}
            <button onClick={closeModal}>Close Modal</button>
        </div>
        </div>
    )
}

export default ProjectModal
