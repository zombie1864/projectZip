export const validateTaskFormFields = (taskDesc, calanderValue, prioLvl) => {
    let missingField = []
    if(taskDesc === undefined) missingField.push('taskDesc')
    if(calanderValue === undefined) missingField.push('date')
    if(prioLvl === undefined) missingField.push('prioLvl')
    return missingField
}