import { FormElement } from "../types/FormElement";

export function getSyncData(submitData: any, elements: FormElement[]) {
    if (!elements.length) return [];
    return elements.map(el => {
        let type = el.type;
        if (['number', 'date', 'password', 'email'].includes(el.type)) {
            type = 'text';
        }
        const id = `${type}-${el.id}`;
        const foundData = submitData[id];
        if (foundData) {
            return {
                ...el,
                value: foundData,
            }
        } else {
            return el;
        }
    })
}