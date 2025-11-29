import { create } from 'zustand';
import { FormElement, FormElementKeys } from '../types/FormElement';

function CreateElement(type: FormElement['type']): FormElement {
  const id = Date.now().toString();
  const baseProps = {id, label: `New ${type.toUpperCase()}`, required: false, placeholder: '', validation: {}};

  switch (type) {
    case 'text':
    case 'textarea':
      return {...baseProps, type};
    case 'select':
      return {...baseProps, type, options: []};
    case 'checkbox':
    case 'radio':
        return {...baseProps, type, checked: false};
    default:
        throw new Error(`Unknown element type: ${type}`);
  }
}

type FormBuilderState = {
    elements: FormElement[];
    selectedId: string | null;
};

type FormBuilderActions = {
    addElement: (type: FormElement['type']) => void;
    setElements: (elements: FormElement[]) => void;
    selectElement: (id: string | null) => void;
    updateElementProperty: (id: string, property: FormElementKeys, value: any) => void;
}

export const useFormBuilderStore = create<FormBuilderState & FormBuilderActions>((set, get) => ({
  elements: [],
  selectedId: null,

  addElement: (type: FormElement['type']) => set((state) => ({elements: [...state.elements, CreateElement(type)]})),
  setElements: (elements: FormElement[]) => set({ elements: elements }),
  selectElement: (id: string | null) => set({ selectedId: id }),
  updateElementProperty: (id: string, property: FormElementKeys, value: any) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ?
        {...el, [property]: value} : el
    )
  }))
}));