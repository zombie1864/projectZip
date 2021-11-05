import React from 'react'
import {motion} from 'framer-motion'
import '../../css/projModal.css'
import '../../css/addProjForm.css'
import { useState } from 'react'
import { validateForm } from '../../validators/formValidator'

const AddProjForm = ({openModal, closeModal, cbFuncDataProp}) => {
    const [proj_name, setProj_name] = useState(''),
        [proj_desc, setProj_desc] = useState(''),
        [proj_purpose, setProj_purpose] = useState(''),
        [proj_techs, setProj_techs] = useState(''),
        [proj_aoa, setProj_aoa] = useState(''),
        [proj_src_code, setProj_src_code] = useState(''), 
        [sliderState, setSliderState] = useState(false),
        [inputNameClassName, setInputNameClassName] = useState('formInput'),  
        [inputTechsClassName, setInputTechsClassName] = useState('formInput'), 
        [inputAoaClassName, setInputAoaClassName] = useState('formInput'), 
        [inputSrcCodeClassName, setInputSrcCodeClassName] = useState('formInput'), 
        [txtAreaDescClassName, setTxtAreaDescClassName] = useState('descTextArea'), 
        [txtAreaPurposeClassName, setTxtAreaPurposeClassName] = useState('purposeTextArea')


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
        cbFuncDataProp(resp) 
    }


    const toggleSlider = () => { 
        setSliderState(!sliderState)
        setProj_src_code('')
    }

    
    const submitForm = event => {
        event.preventDefault()
        const dataToSubmit = {
            proj_name: proj_name,
            proj_desc: proj_desc,
            proj_purpose: proj_purpose,
            proj_techs: proj_techs,
            proj_aoa: proj_aoa,
            proj_src_code: proj_src_code
        }
        let formMetaData = validateForm(dataToSubmit, sliderState),
            validForm = formMetaData.isFormValid,
            invalidInputs = formMetaData['invalidInputs']
        
        console.log(invalidInputs);

        if (invalidInputs.includes('proj_name')) {
            setInputNameClassName('formInput invalidInput')
        } 
        if ( invalidInputs.includes('proj_techs')) { 
            setInputTechsClassName('formInput invalidInput')
        }  
        if (invalidInputs.includes('proj_aoa')) {
            setInputAoaClassName('formInput invalidInput')
        }
        if (invalidInputs.includes('proj_src_code')) {
            setInputSrcCodeClassName('formInput invalidInput')
        }
        if ( invalidInputs.includes('proj_desc') ) {
            setTxtAreaDescClassName('descTextArea invalidInput')
        }  
        if (invalidInputs.includes('proj_purpose') ) {
            setTxtAreaPurposeClassName('purposeTextArea invalidInput')
        }

        if (!validForm) {
            console.log('NO');
        } else {
            console.log('YES');
            // addData(dataToSubmit)
            setProj_name('')
            setProj_desc('')
            setProj_purpose('')
            setProj_techs('')
            setProj_aoa('')
            setProj_src_code('')
        }
    }

    if (!openModal) return null 

    const handleChange = event => {

        switch (event.target.dataset.fieldname) {
            case 'name':
                setInputNameClassName(event.target.dataset.defaultclassname)
                setProj_name(event.target.value)
                break 
            case 'tech':
                setInputTechsClassName(event.target.dataset.defaultclassname)
                setProj_techs(event.target.value)
                break 
            case 'srcCode':  
                setInputSrcCodeClassName(event.target.dataset.defaultclassname) 
                setProj_src_code(event.target.value)
                break 
            case 'aoa':
                setInputAoaClassName(event.target.dataset.defaultclassname)
                setProj_aoa(event.target.value)
                break 
            case 'desc':
                setTxtAreaDescClassName(event.target.dataset.defaultclassname)
                setProj_desc(event.target.value)
                break 
            case 'purpose':
                setTxtAreaPurposeClassName(event.target.dataset.defaultclassname)
                setProj_purpose(event.target.value)
                break 
        }
    }


    return (
        <div>
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
                        className={inputNameClassName}
                        value={proj_name}
                        data-defaultclassname='formInput' // custom attr 
                        data-fieldname='name'
                        onChange={handleChange}
                        placeholder="Add Project Name"/>
                    </th>
                    </tr>
                    <tr className='formTableRow'>
                    <td className='techContainer'>
                        <label className='formLabels'>Technologies</label>
                        <input 
                        type="text" 
                        className={inputTechsClassName}
                        value={proj_techs}
                        data-defaultclassname='formInput'
                        data-fieldname='tech'
                        onChange={handleChange}
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
                            className={inputSrcCodeClassName}
                            value={proj_src_code}
                            data-defaultclassname='formInput'
                            data-fieldname='srcCode'
                            onChange={handleChange}
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
                        className={inputAoaClassName}
                        value={proj_aoa}
                        data-defaultclassname='formInput'
                        data-fieldname='aoa'
                        onChange={handleChange}
                        placeholder="Add Project Area of Application"/>
                    </td>
                    </tr>
                </table>
                <div className='textAreaContainer'>
                    <label className='formLabels'>Describtion</label>
                        <textarea 
                        value={proj_desc}
                        data-defaultclassname='descTextArea'
                        className={txtAreaDescClassName}
                        data-fieldname='desc'
                        onChange={handleChange}
                        placeholder="Add Project Describtion"/>
                    <label className='formLabels'>Purpose</label>
                        <textarea 
                        value={proj_purpose}
                        data-defaultclassname='purposeTextArea'
                        data-fieldname='purpose'
                        className={txtAreaPurposeClassName}
                        onChange={handleChange}
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
