export const validateTaskFormFields = (taskDesc, date, prioLvl) => {
    let missingField = []
    if(taskDesc === undefined) missingField.push('taskDesc')
    if(date === undefined) missingField.push('date')
    if(prioLvl === undefined) missingField.push('prioLvl')
    return missingField
}