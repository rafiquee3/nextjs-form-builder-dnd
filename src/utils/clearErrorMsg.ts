export function clearErrorMsg(field: string, errors: string[], set: (data: string[]) => void) {
    const needUpdate = errors.filter(msg => msg.toLowerCase().startsWith(field));
    if (!needUpdate) return;

    const updatedData = errors.filter(msg => !(msg.toLowerCase().startsWith(field)));
    set(updatedData);
    return;
};