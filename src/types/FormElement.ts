export type BaseElement = {
    id: string;
    type: 'text' | 'checkbox' | 'select' | 'textarea' | 'radio' | 'email' | 'password' | 'number';
    required: boolean;
    label: string;
    placeholder: string;
    validation: object;
}

export interface SelectOption {
    label: string; 
    value: string;
}

export type SelectElement = BaseElement & {
    type: 'select';
    options: SelectOption[];
    value: string;
}

export type CheckboxElement = BaseElement & {
    type: 'checkbox';
    checked: boolean;
}

export type TextareaElement = BaseElement & {
    type: 'textarea';
    value: string;
}

export type TextElement = BaseElement & {
    type: 'text';
    value: string;
}

export type RadioElement = BaseElement & {
    type: 'radio';
    checked: boolean;
}

export type FormElement = SelectElement | CheckboxElement | TextareaElement | TextElement | RadioElement;
export type FormElementKeys = keyof (SelectElement & CheckboxElement & TextElement & TextareaElement & RadioElement);

export interface DropItem {
    type: FormElement['type']; 
}

export type RHFDefaultValues = {
    [key: string]: string | boolean | number | undefined;
}