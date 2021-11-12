export const validateForm = (dataToSubmit, sliderState) => {
    let formMetaData = {
        isFormValid: true,
        invalidInputs: []
    }

    Object.keys(dataToSubmit).forEach( key => {
        if (key !== 'proj_src_code' && dataToSubmit[key] === '') {
            formMetaData.isFormValid = false 
            formMetaData.invalidInputs.push(key)
        } else if (key === 'proj_src_code' && dataToSubmit[key] === '' && !sliderState) {
            formMetaData.isFormValid = false 
            formMetaData.invalidInputs.push(key)
        }
    })

    return formMetaData
} // NOTE review this validator again, perform test on it 

