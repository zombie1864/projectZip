import {motion} from 'framer-motion'
import {MdPlaylistAdd} from 'react-icons/md'

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { opacity: 1 }
};


const AddProjFormTemplate = (
    openAddNewProjModal,
    closeAddNewProjModal,
    proj_name,
    proj_desc,
    proj_purpose,
    proj_techs,
    proj_aoa,
    proj_src_code,
    proj_resource,
    proj_resources,
    sliderState,
    inputNameClassName,
    inputTechsClassName,
    inputAoaClassName,
    inputSrcCodeClassName,
    txtAreaDescClassName,
    txtAreaPurposeClassName,
    toggleAddProjResource,
    toggleSlider,
    submitForm,
    handleChange,
    addProjResource,
    saveResource,
    cancelAddProjResource
) => {
    /**
    @description: 
    @param {openAddNewProjModal - props} 
    @param {closeAddNewProjModal - props} 
    @param {proj_name - state} 
    @param {proj_desc - state} 
    @param {proj_purpose - state} 
    @param {proj_techs - state} 
    @param {proj_aoa - state} 
    @param {proj_src_code - state} 
    @param {proj_resource - state} 
    @param {proj_resources - state} 
    @param {sliderState - state} 
    @param {inputNameClassName - state} 
    @param {inputTechsClassName - state} 
    @param {inputAoaClassName - state} 
    @param {inputSrcCodeClassName - state} 
    @param {txtAreaDescClassName - state} 
    @param {txtAreaPurposeClassName - state} 
    @param {toggleAddProjResource - state} 
    @param {toggleSlider - event handler} 
    @param {submitForm - event handler} 
    @param {handleChange - event handler} 
    @param {addProjResource - event handler} 
    @param {saveResource - event handler} 
    **/
    return (
        <div className={openAddNewProjModal ? '' : 'addNewProjectComponent'}>
            {
                !openAddNewProjModal ? 
                <div className='projBtnContainer'>
                <motion.button
                variants={item} 
                whileHover={{y:-15.0}}
                onClick={closeAddNewProjModal}//NOTE this togglesModal state not just close it
                className='addProjBtn'
                style={{position: 'relative', top: '19px'}}> 
                    <motion.span className='projBtnIcon'>{<MdPlaylistAdd/>}</motion.span>
                </motion.button>
                <motion.p  
                variants={item} 
                className='projBtnTitle'
                style={{position: 'relative', top: '19px'}}>
                    Add New Project
                </motion.p> 
                </div> :
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
                                <textarea 
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
                                <textarea 
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
                                    <textarea 
                                    className='srcCodeUnavil'
                                    placeholder="Source Code Unavailable"
                                    value='' // clears input 
                                    readOnly/>
                                    : 
                                    <textarea 
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
                                <textarea 
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
                        <div className='resourceContainer'>
                            <span 
                            className={toggleAddProjResource ? 'availProjResourceTxtWithInput' : 'availProjResourceTxt'}>
                                Available Project Resources?
                            </span>
                            <div 
                            className={!toggleAddProjResource && 'addResourceBtnContainer'}>
                                {
                                    toggleAddProjResource ? 
                                    <button 
                                    type='button'
                                    onClick={cancelAddProjResource}
                                    className='cancelAddProjResourceBtn'>
                                        Cancel
                                    </button> :
                                    <span>
                                        <input
                                        type='button'
                                        onClick={addProjResource}
                                        value='Add Project Resource'
                                        />
                                    </span>
                                }
                            </div>
                            {
                            toggleAddProjResource && 
                            <div className='addResourceInputFields'>
                                <textarea 
                                type="text"
                                className='formInput'
                                placeholder='Add Resource'
                                value={proj_resource}
                                data-fieldname='resource'
                                onChange={handleChange}/>
                                <button
                                type='button'
                                className='addResourceBtn'
                                onClick={saveResource}>Add Resource</button>
                            </div>
                            }
                        </div>
                        {
                            toggleAddProjResource && 
                            <ul className={proj_resources.length && 'projResourceList'} >
                                    {
                                        proj_resources.map((resource, idx) => {
                                            return (
                                                <li 
                                                className='projResourceItem'
                                                key={idx}>{resource}</li>
                                            )
                                        })
                                    }
                            </ul>
                        }
                        <div className='saveBtnContainer'>
                            <span>
                                <input 
                                className='formSaveBtn' 
                                type="submit" 
                                value="save project"/>
                            </span>
                        </div>
                    </form>
                    <div className="ModalBtnContainer">
                        <button 
                         // all btns are, by default, type='submit'
                        className="closeModalBtn" 
                        onClick={closeAddNewProjModal}>Close</button>
                    </div>
                </div>
                </div>
            }
        </div>
    )
}

export default AddProjFormTemplate
