export const validateForm = (dataToSubmit, sliderState) => {
    /**
    @description: validates user's input on form 
    @param {dataToSubmit} Object: contains user inputs as values 
    @param {sliderState} Boolean: a bool which indicates if proj_src_code availy is true or false 
    **/
    let formMetaData = {
        isFormValid: true,
        invalidInputs: []
    }

    Object.keys(dataToSubmit).forEach( key => {
        if (
            ( key !== 'proj_src_code' && dataToSubmit[key] === '' )  ||
            ( key !== 'proj_src_code' && dataToSubmit[key] === ' ' ) 
        ) {
            formMetaData.isFormValid = false 
            formMetaData.invalidInputs.push(key)
        } else if (key === 'proj_src_code' && dataToSubmit[key] === '' && !sliderState) {
            formMetaData.isFormValid = false 
            formMetaData.invalidInputs.push(key)
        }
    })

    return formMetaData
} 

