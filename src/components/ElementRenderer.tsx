'use client';
import { useEffect } from "react";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { FormElement } from "../types/FormElement";
import CheckboxInput from "./FormElements/CheckboxInput";
import RadioInput from "./FormElements/RadioInput";
import SelectInput from "./FormElements/SelectInput";
import TextareaInput from "./FormElements/TextareaInput";
import TextInput from "./FormElements/TextInput";
import { ErrorMsg } from "./ErrorMsg";

const componentMap = {
    'text': TextInput,
    'password': TextInput,
    'email': TextInput,
    'date': TextInput,
    'number': TextInput,
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
    const remCfgItem = useFormBuilderStore(store => store.remItemCfg);
    const errorsMsgArr = element.validation.errors;
    const formElements = useFormBuilderStore(store => store.elements);
    const index = formElements.findIndex(el => el.id === id);
    const firstEl = index === 0;
    const lastEl = index === formElements.length - 1;
    let widgetColor = '';

    switch (element.type) {
        case 'text': 
        case 'password':
        case 'email':
        case 'date':
        case 'number':
            widgetColor = 'blue-300';
            break;
        case 'checkbox':
            widgetColor = 'red-300';
            break;
        case 'select':
            widgetColor = 'orange-300';
            break;
        case 'textarea':
            widgetColor = `violet-300`;
            break; 
        case 'radio':
            widgetColor = 'gray-400';
            break;
    }
    const borderColor = `border-${widgetColor}`;
    console.log('colorB', borderColor)
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const buttonAction =  (e.target as HTMLElement).closest('button');
        if (buttonAction) {
            switch(buttonAction.textContent) {
                case 'del':
                    e.stopPropagation();
                    remItem(id);
                    remCfgItem(id);
                    unregister();
                    break;
                case '⬆':
                    moveItem(id, 'up');
                    break;
                case '⬇':
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
        <div className="my-2 relative z-0" onClick={handleClick}>
            <div className={`flex bg-${widgetColor} py-[5px] px-3 rounded-t-lg w-[200px] z-999 -mb-[1px] z-1 relative flex justify-between`}>
                <div className="px-6">
                    <h3>{element.type}</h3>
                </div>
                <div className="flex gap-1">   
                    <button disabled={firstEl}>⬆</button>
                    <button disabled={lastEl}>⬇</button>
                    <button>⌫</button>
                </div>
            </div>
            <div key={id} className={`flex bg-white border-1 border border-dashed ${borderColor} hover:border-black rounded-lg rounded-tl-none p-4`} onClick={handleClick}>
                <Component {...element as any} type={element.type} required={element.required}/>
            </div>
            <ErrorMsg errors={errorsMsgArr}/>
        </div>
    );
}
