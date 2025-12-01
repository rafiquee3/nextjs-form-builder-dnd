import { create } from 'zustand';
import { FormElement, FormElementKeys } from '../types/FormElement';

function CreateElement(type: FormElement['type']): FormElement {
  const id = Date.now().toString();
  const baseProps = {id, label: `New ${type.toUpperCase()}`, required: false, placeholder: '', value: ''};
  let validation: any = {};

  switch (type) {
    case 'text':
      validation = {
        placeholder: '',
        min: undefined,
        max: undefined,
        regex: undefined,
        required: undefined,
        types: ['text', 'email', 'password'],
      }
      return {...baseProps, type, validation};
    case 'textarea':
      validation = {
        placeholder: '',
        min: undefined,
        max: undefined,
        regex: undefined,
        required: undefined,
      }
      return {...baseProps, type, validation};
    case 'select':
      validation = {
        required: undefined
      }
      return {...baseProps, type, options: [], validation};
    case 'checkbox':
    case 'radio':
      validation = {
        required: undefined,
        checked: false
      }
        return {...baseProps, type, checked: false, validation};
    default:
        throw new Error(`Unknown element type: ${type}`);
  }
}

type FormBuilderState = {
    elements: FormElement[];
    selectedId: FormElement['id'] | null;
};

type FormBuilderActions = {
    addElement: (type: FormElement['type']) => void;
    setElements: (elements: FormElement[]) => void;
    selectElement: (id:  FormElement['id'] | null) => void;
    updateElementProperty: (id:  FormElement['id'], property: FormElementKeys, value: any) => void;
    remElement: (id:  FormElement['id']) => void;
    moveElement: (id: FormElement['id'], action: 'up' | 'down') => void;
}

export const useFormBuilderStore = create<FormBuilderState & FormBuilderActions>((set, get) => ({
  elements: [],
  selectedId: null,

  addElement: (type: FormElement['type']) => set((state) => ({elements: [...state.elements, CreateElement(type)]})),
  remElement: (id: FormElement['id']) => set((state) => {
    const element = state.elements.find(el => el.id === id);
    return element ? {elements: state.elements.filter(el => el.id !== id)} : {elements: state.elements};
  }),
  moveElement: (id: FormElement['id'], action: 'up' | 'down') => set((state) => {
    const elements = [...state.elements];
    const index = elements.findIndex(el => el.id === id);

    if (index === -1) return state;
    let newIndex = index;

    if (action === 'up') {
      newIndex = Math.max(0, index - 1);
    } else if (action === 'down') {
      newIndex = Math.min(index + 1, elements.length - 1);
    }

    if (newIndex === index) return state;

    const [movedElement] = elements.splice(index, 1);
    elements.splice(newIndex, 0, movedElement);

    return {elements};
  }),
  setElements: (elements: FormElement[]) => set({ elements: elements }),
  selectElement: (id: string | null) => set({ selectedId: id }),
  updateElementProperty: (id: string, property: FormElementKeys, value: any) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ?
        {...el, [property]: value} : el
    )
  }))
}));