import '../../css/projModal.css'
import '../../css/addProjForm.css'
import { useState } from 'react'
import { validateForm } from '../../validators/formValidator'
import AddProjFormTemplate from '../../templates/projectsTemplate/AddProjFormTemplate'

const AddProjForm = ({openAddNewProjModal, closeAddNewProjModal, updateProjectsState}) => {
    /**
    @description: renders "Add New Project" btn to user. onClick will open modal form. 
    @param {openAddNewProjModal - props.state} Boolean: 
    @param {closeAddNewProjModal - props.handlers} event_handler: 
    @param {updateProjectsState - props.handlers} event_handler: 
    **/
    const [proj_name, setProj_name] = useState(''),
        [proj_desc, setProj_desc] = useState(''),
        [proj_purpose, setProj_purpose] = useState(''),
        [proj_techs, setProj_techs] = useState(''),
        [proj_aoa, setProj_aoa] = useState(''),
        [proj_src_code, setProj_src_code] = useState(''), 
        [proj_resource, setProj_resource] = useState(''), 
        [proj_resources, setProj_resources] = useState([]),
        [toggleAddProjResource, setToggleAddProjResource] = useState(false),
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
        const resp = await req.json() // sends back updated bd
        updateProjectsState(resp) 
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
            proj_src_code: proj_src_code,
            proj_resources: proj_resources
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
            addData(dataToSubmit)
            setProj_name('')
            setProj_desc('')
            setProj_purpose('')
            setProj_techs('')
            setProj_aoa('')
            setProj_src_code('')
            setToggleAddProjResource(false)
        }
    }


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
            case 'resource':
                setProj_resource(event.target.value)
                break
            default:
                return 
        }
    }

    const addProjResource = () => setToggleAddProjResource(true)
    const cancelAddProjResource = () => {
        setToggleAddProjResource(false) 
        setProj_resources([])
    }
    const saveResource = () => {
        if (proj_resource === '') return 
        setProj_resources([...proj_resources,proj_resource])
        setProj_resource('')
    }


    return AddProjFormTemplate(
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
    )
}
  

export default AddProjForm
