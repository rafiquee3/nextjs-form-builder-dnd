import { BaseElement, CheckboxElement, FormElement, RadioElement, SelectElement, TextareaElement } from "../FormElement";

export interface ExportModalProps {
    htmlContent: string;
    onClose: () => void;
}
export interface TextInputProps extends BaseElement {isPaletteItem: boolean, placeholder: string}
export interface CheckboxInputProps extends CheckboxElement {isPaletteItem: boolean}
export interface RadioInputProps extends RadioElement {isPaletteItem: boolean}
export interface TextareaInputProps extends TextareaElement {isPaletteItem: boolean}
export interface SelectInputProps extends SelectElement {isPaletteItem: boolean}
export interface DraggableElementProps {
    elementProps: {type: 'text' | 'checkbox' | 'select' | 'textarea' | 'radio'};
    children: React.ReactNode;
}
