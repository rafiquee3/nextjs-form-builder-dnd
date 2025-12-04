export interface ValidationRules {
    min: number | undefined;
    max: number | undefined;
    regex: string | undefined;
    required: boolean | undefined;
    checked: boolean | undefined;
}

export type BaseElement = {
    id: string;
    type: 'text' | 'checkbox' | 'select' | 'textarea' | 'radio' | 'email' | 'password' | 'number' | 'date' | '';
    required: boolean;
    label: string;
    validation: ValidationRules;
}


export type SelectElement = BaseElement & {
    type: 'select';
    options: string[];
    value: string;
}

export type CheckboxElement = BaseElement & {
    type: 'checkbox';
    checked: boolean;
    value: string;
}

export type TextareaElement = BaseElement & {
    type: 'textarea';
    value: string;
    placeholder: string;
}

export type TextElement = BaseElement & {
    type: 'text';
    value: string;
    placeholder: string;
}

export type RadioElement = BaseElement & {
    type: 'radio';
    checked: boolean;
    name: string;
    value: string;
}

export type FormElement = SelectElement | CheckboxElement | TextareaElement | TextElement | RadioElement;
export type FormElementKeys = keyof (SelectElement & CheckboxElement & TextElement & TextareaElement & RadioElement);

export interface DropItem {
    type: FormElement['type']; 
}

export type RHFDefaultValues = {
    [key: string]: string | boolean | number | undefined;
}