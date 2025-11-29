import { FormElement } from "../types/FormElement";
import { RHFDefaultValues } from "../types/FormElement";

export const getRHFDefaultValues = (elements: FormElement[]): RHFDefaultValues => {
    return elements.reduce((acc, el) => {
        let defaultValue: string | boolean = 'ss';

        if (el.type === 'checkbox' || el.type === 'radio') {
            defaultValue = el.checked || false;
        } else {
            defaultValue = el.value;
        }
        acc[el.id] = defaultValue;
        return acc;
    }, {} as RHFDefaultValues);
} 