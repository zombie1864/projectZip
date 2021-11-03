import React from 'react'
import {motion} from 'framer-motion'
import '../../css/projModal.css'
import '../../css/addProjForm.css'
import { useState } from 'react'

const AddProjForm = ({openModal, closeModal, cbFuncDataProp}) => {
    const [proj_name, setProj_name] = useState(''),
        [proj_desc, setProj_desc] = useState(''),
        [proj_purpose, setProj_purpose] = useState(''),
        [proj_techs, setProj_techs] = useState(''),
        [proj_aoa, setProj_aoa] = useState(''),
        [proj_src_code, setProj_src_code] = useState(''), 
        [sliderState, setSliderState] = useState(false)


    const addData = async (dataToSubmit) => {
        const req = await fetch(
            'http://localhost:5000/projects', 
            {
                method: 'POST', 
                headers: { 'Content-type': 'application/json' }, 
                body: JSON.stringify(dataToSubmit)
            }
        )
        const resp = await req.json()
        cbFuncDataProp(resp) // NOTE fix the name of the func 
    }

    const toggleSlider = () => { 
        setSliderState(!sliderState)
        setProj_src_code('')
    }
    
    const submitForm = event => {
        event.preventDefault()
        // ADD VALIDATIONS HERE 
        // code here 
        // ADD VALIDATIONS HERE 
        const dataToSubmit = {
            proj_name: proj_name,
            proj_desc: proj_desc,
            proj_purpose: proj_purpose,
            proj_techs: proj_techs,
            proj_aoa: proj_aoa,
            proj_src_code: proj_src_code
        }
        addData(dataToSubmit)
        setProj_name('')
        setProj_desc('')
        setProj_purpose('')
        setProj_techs('')
        setProj_aoa('')
        setProj_src_code('')
    }

    if (!openModal) return null 

    return (
        <div>
            {console.log('render')}
        <motion.div className="modalBackdrop"
            initial={{opacity: 0}} 
            animate={{opacity: 0.90}} 
            transition={{duration: 0.5}}/>
        <div className="projFormModal">
            <form  className='addProjForm' onSubmit={submitForm}>
                <table>
                    <tr className='formTableRow'>
                    <th className='nameContainer'>
                        <label className='formLabels'>Name</label>
                        <input 
                        type="text" 
                        className='formInput'
                        value={proj_name}
                        onChange={event => setProj_name(event.target.value)}
                        placeholder="Add Project Name"/>
                    </th>
                    </tr>
                    <tr className='formTableRow'>
                    <td className='techContainer'>
                        <label className='formLabels'>Technologies</label>
                        <input 
                        type="text" 
                        className='formInput'
                        value={proj_techs}
                        onChange={event => setProj_techs(event.target.value)}
                        placeholder="Add Project Technologies"/>
                    </td>
                    </tr>
                    <tr className='formTableRow'>
                    <td className='srcCodeContainer'>
                        <label className='formLabels'>Source Code</label>
                        { 
                            sliderState ? 
                            <input 
                            className='srcCodeUnavil'
                            placeholder="Source Code Unavailable"
                            value='' // clears input 
                            readOnly/>
                            : 
                            <input 
                            type="text" 
                            className='formInput'
                            value={proj_src_code}
                            onChange={event => setProj_src_code(event.target.value)}
                            placeholder="Add Project Source Code"/>
                        }
                        <div className='sliderContainer'>
                            <span 
                            style={sliderState ? {color: 'rgba(233, 139, 17)'} : {color: 'rgba(233, 139, 17, 0.5)'}}>Source code unavailable?</span>
                            <label className="switch">
                                <input type="checkbox" onClick={toggleSlider}/>
                                <span className="slider"/>
                            </label>
                        </div>
                    </td>
                    </tr>
                    <tr className='formTableRow'>
                    <td className='aoaContainer'>
                        <label className='formLabels'>Area of Application</label>
                        <input 
                        type="text" 
                        className='formInput'
                        value={proj_aoa}
                        onChange={event => setProj_aoa(event.target.value)}
                        placeholder="Add Project Area of Application"/>
                    </td>
                    </tr>
                </table>
                <div className='textAreaContainer'>
                    <label className='formLabels'>Describtion</label>
                        <textarea 
                        value={proj_desc}
                        className='descTextArea'
                        onChange={event => setProj_desc(event.target.value)}
                        placeholder="Add Project Describtion"/>
                    <label className='formLabels'>Purpose</label>
                        <textarea 
                        value={proj_purpose}
                        className='purposeTextArea'
                        onChange={event => setProj_purpose(event.target.value)}
                        placeholder="Add Project Purpose"/>
                </div>
                <div className='saveBtnContainer'>
                    <span>
                        <input className='formSaveBtn' type="submit" value="save project"/>
                    </span>
                </div>
            </form>
            <div className="ModalBtnContainer">
                <button className="closeModalBtn" onClick={closeModal}>Close</button>
            </div>
        </div>
        </div>
    )
}

export default AddProjForm
