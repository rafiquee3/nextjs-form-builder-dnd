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
    
    if (!Component) {
        return <div>Unknown Component Type: {element.type}</div>;
    }

    return (
        <div key={element.id}>
            <Component {...element as any}/>
        </div>
    );
}
