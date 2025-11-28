import { FormElement } from "../types/FormElement";

const componentMap = {
    'text': TextInput,
    'checkbox': CheckboxInput, 
    'select': SelectInput,
    'textarea': textareaInput, 
    'radio': radioInput,
}

interface ElementRendererProps {
    element: FormElement;
}

export default function ElementRenderer({element}: ElementRendererProps) {
    const Component = componentMap[element.type];
    
    if (!Component) {
        return <div>Unknown Component Type: {element.type}</div>;
    }

    return (
        <div key={element.id}>
            <Component {...element}/>
        </div>
    );
}
