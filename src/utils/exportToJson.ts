import { FormElement } from "../types/FormElement";

export function exportToJson(elementsArr: FormElement[]) {
    return elementsArr.reduce((acc: any, curr, i) => {
        acc[i] = curr;
        return acc;
    }, {} as {[key: number]: any});
}   