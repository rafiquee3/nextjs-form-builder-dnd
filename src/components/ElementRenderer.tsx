'use client';
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { FormElement } from "../types/FormElement";
import CheckboxInput from "./FormElements/CheckboxInput";
import RadioInput from "./FormElements/RadioInput";
import SelectInput from "./FormElements/SelectInput";
import TextareaInput from "./FormElements/TextareaInput";
import TextInput from "./FormElements/TextInput";

const componentMap = {
    'text': TextInput,
    'checkbox': CheckboxInput, 
    'select': SelectInput,
    'textarea': TextareaInput, 
    'radio': RadioInput,
}

interface ElementRendererProps {
    element: FormElement;
}

export default function ElementRenderer({element}: ElementRendererProps) {
    const Component = componentMap[element.type];
    const id = element.id;
    const remItem = useFormBuilderStore(store => store.remElement);
    const selectElement = useFormBuilderStore(store => store.selectElement);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const buttonAction =  (e.target as HTMLElement).closest('button');
        if (buttonAction && buttonAction.textContent === 'del') {
            e.stopPropagation();
            remItem(id);
        } else {
            selectElement(id);
        }
    }
    
    if (!Component) {
        return <div>Unknown Component Type: {element.type}</div>;
    }

    return (
        <div key={id} className="flex my-2 bg-red-100 " onClick={handleClick}>
            <Component {...element as any}/>
            <button>del</button>
        </div>
    );
}
