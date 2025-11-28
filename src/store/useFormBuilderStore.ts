import { create } from 'zustand';
import { FormElement, FormElementKeys } from '../types/FormElement';

type FormBuilderState = {
    elements: FormElement[];
    selectedId: string | null;
};

type FormBuilderActions = {
    addElement: (type: FormElement) => void;
    setElements: (elements: FormElement[]) => void;
    selectElement: (id: string | null) => void;
    updateElementProperty: (id: string, property: FormElementKeys, value: any) => void;
}

export const useFormBuilderStore = create<FormBuilderState & FormBuilderActions>((set, get) => ({
  elements: [],
  selectedId: null,

  addElement: (type: FormElement) => set((state) => ({elements: [...state.elements, type]})),
  setElements: (elements: FormElement[]) => set({ elements: elements }),
  selectElement: (id: string | null) => set({ selectedId: id }),
  updateElementProperty: (id: string, property: FormElementKeys, value: any) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ?
        {...el, [property]: value} : el
    )
  }))
}));