import { BaseElement, CheckboxElement, RadioElement, SelectElement, TextareaElement } from "../FormElement";

export interface TextInputProps extends BaseElement {isPaletteItem: boolean}
export interface CheckboxInputProps extends CheckboxElement {isPaletteItem: boolean}
export interface RadioInputProps extends RadioElement {isPaletteItem: boolean}
export interface TextareaInputProps extends TextareaElement {isPaletteItem: boolean}
export interface SelectInputProps extends SelectElement {isPaletteItem: boolean}
