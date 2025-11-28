import { create } from 'zustand';
import { FormElement } from '../types/FormElement';

type FormBuilderState = {
    elements: FormElement[];
    selectedId: string | null;
};

type FormBuilderActions = {
    addElement: (type: FormElement) => void;
    setElements: (elements: FormElement[]) => void;
    selectElement: (id: string | null) => void;
}

export const useFormBuilderStore = create<FormBuilderState & FormBuilderActions>((set) => ({
  elements: [],
  selectedId: null,

  addElement: (type: FormElement) => set((state) => ({elements: [...state.elements, type]})),
  setElements: (elements: FormElement[]) => set({ elements: elements }),
  selectElement: (id: string | null) => set({ selectedId: id }),
}));