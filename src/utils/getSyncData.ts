import { FormElement } from "../types/FormElement";

export function getSyncData(submitData: any, elements: FormElement[]) {
    return elements.map(el => {
        const foundData = submitData[el.id];
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