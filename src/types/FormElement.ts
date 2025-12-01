export interface ValidationRules {
    placeholder: string;
    min: number | undefined;
    max: number | undefined;
    regex: string | undefined;
    required: boolean | undefined;
    checked: boolean | undefined;
    name: string;
}

export type BaseElement = {
    id: string;
    type: 'text' | 'checkbox' | 'select' | 'textarea' | 'radio' | 'email' | 'password' | 'number';
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
}

export type FormElement = SelectElement | CheckboxElement | TextareaElement | TextElement | RadioElement;
export type FormElementKeys = keyof (SelectElement & CheckboxElement & TextElement & TextareaElement & RadioElement);

export interface DropItem {
    type: FormElement['type']; 
}

export type RHFDefaultValues = {
    [key: string]: string | boolean | number | undefined;
}