import React from 'react'

const modalCss = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    zIndex: 1, 
    fontSize: '12px'
}

const overLayCss = {
    position: 'fixed',
    top: 0, 
    left: 0,
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1 
}

const ProjectModal = ({openModal, projTitle, projPurpose, projTech, projAoA, ProjSrcCode, closeModal}) => { 
    if (!openModal) return null 
    return (
        <div style={overLayCss}>
        <div style={modalCss}>
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
