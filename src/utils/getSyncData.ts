import { FormElement } from "../types/FormElement";

export function getSyncData(submitData: any, elements: FormElement[]) {
    return elements.map(el => {
        const id = `${el.type}-${el.id}`;
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