import React from 'react'

const modalCss = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    zIndex: 1 
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

const Modal = ({openModal, children, onClose}) => { // yes has to be called children
    if (!openModal) return null 
    return (
        <div style={overLayCss}>
        <div style={modalCss}>
            {children}
            <button onClick={onClose}>Close Modal</button>
        </div>
        </div>
    )
}

export default Modal
