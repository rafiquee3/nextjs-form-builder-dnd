export type BaseElement = {
    id: string;
    type: 'text' | 'checkbox' | 'select' | 'textarea' | 'radio';
    required: boolean;
    label: 'string';
    placeholder: 'string';
    validation: object;
}

export type SelectElement = BaseElement & {
    type: 'select';
    options: string[];
}

export type CheckboxElement = BaseElement & {
    type: 'checkbox';
    defaultChecked: boolean;
}

export type TextareaElement = BaseElement & {
    type: 'textarea';
}

export type TextElement = BaseElement & {
    type: 'text';
}

export type RadioElement = BaseElement & {
    type: 'radio';
    defaultChecked: boolean;
}

export type FormElement = SelectElement | CheckboxElement | TextareaElement | TextElement | RadioElement;