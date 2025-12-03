export function clearErrorMsg(field: string, errors: string[], set: (data: string[]) => void) {
    const needUpdate = errors.filter(msg => msg.toLowerCase().startsWith(field));
    if (!needUpdate) return;

    const updatedData = errors.filter(msg => !(msg.toLowerCase().startsWith(field)));
    set(updatedData);
    return;
};

export function addErrorMsg(validation: any, errorMsg: string[] ,setErrorMsg: (data: string[]) => void) {
    const errorsArr = validation.error?.flatten().formErrors;
    setErrorMsg([...errorMsg, ...errorsArr]);
}
