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
    sliderState,
    inputNameClassName,
    inputTechsClassName,
    inputAoaClassName,
    inputSrcCodeClassName,
    txtAreaDescClassName,
    txtAreaPurposeClassName,
    toggleSlider,
    submitForm,
    handleChange
) => {
    return (
        <div>
            {
                !openAddNewProjModal ? 
                <div className='projBtnContainer'>
                <motion.button
                variants={item} 
                whileHover={{y:5.0}}
                onClick={closeAddNewProjModal}//NOTE this togglesModal state not just close it
                className='projBtns'> 
                    <motion.span className='projBtnIcon'>{<MdPlaylistAdd/>}</motion.span>
                </motion.button>
                <motion.p  
                variants={item} 
                className='projBtnTitle'>
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
                        <button 
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
