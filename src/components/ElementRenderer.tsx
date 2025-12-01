'use client';
import { useEffect } from "react";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { FormElement } from "../types/FormElement";
import CheckboxInput from "./FormElements/CheckboxInput";
import RadioInput from "./FormElements/RadioInput";
import SelectInput from "./FormElements/SelectInput";
import TextareaInput from "./FormElements/TextareaInput";
import TextInput from "./FormElements/TextInput";

const componentMap = {
    'text': TextInput,
    'password': TextInput,
    'email': TextInput,
    'checkbox': CheckboxInput, 
    'select': SelectInput,
    'textarea': TextareaInput, 
    'radio': RadioInput,
}

interface ElementRendererProps {
    element: FormElement;
    unregister: () => void;
}

export default function ElementRenderer({element, unregister}: ElementRendererProps) {
    const Component = componentMap[element.type];
    const id = element.id;
    const remItem = useFormBuilderStore(store => store.remElement);
    const selectElement = useFormBuilderStore(store => store.selectElement);
    const moveItem = useFormBuilderStore(store => store.moveElement);

    const formElements = useFormBuilderStore(store => store.elements);
    const index = formElements.findIndex(el => el.id === id);
    const firstEl = index === 0;
    const lastEl = index === formElements.length - 1;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const buttonAction =  (e.target as HTMLElement).closest('button');
        if (buttonAction) {
            switch(buttonAction.textContent) {
                case 'del':
                    e.stopPropagation();
                    remItem(id);
                    unregister();
                    break;
                case '⬆️':
                    moveItem(id, 'up');
                    break;
                case '⬇️':
                    moveItem(id, 'down');
                    break;
            }
        } else {
            selectElement(id);
        }
    }
    
    if (!Component) {
        return <div>Unknown Component Type: {element.type}</div>;
    }

    useEffect(() => {
        () => unregister();
    }, []);

    return (
        <div key={id} className="flex my-2 bg-red-100 " onClick={handleClick}>
            <Component {...element as any} type={element.type} required={element.required}/>
            <button disabled={firstEl}>⬆️</button>
            <button disabled={lastEl}>⬇️</button>
            <button>del</button>
        </div>
    );
}
