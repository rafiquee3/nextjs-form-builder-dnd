'use client';
import { useEffect, useState } from "react"
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { CheckboxElement, FormElement, RadioElement } from "../types/FormElement";

export default function PropertiesPanel() {
    const [currentElement, setCurrentElement] = useState<FormElement | null>(null);
    const selectedId = useFormBuilderStore(store => store.selectedId);
    const elements = useFormBuilderStore(store => store.elements);
    const updateElement = useFormBuilderStore(store => store.updateElementProperty);

    useEffect(() => {
        if (selectedId) {
            const elementToEdit = elements.find(el => el.id === selectedId);
            setCurrentElement(elementToEdit || null);
        } else {
            setCurrentElement(null);
        }
    }, [selectedId, elements])

    const isCheckable = (currentElement?.type === 'checkbox' || currentElement?.type === 'radio');
    const checkableElement = currentElement as (CheckboxElement | RadioElement);
    const hasValidationRules = currentElement ? Object.keys(currentElement?.validation).length > 0 : false;
    const labelInputId = currentElement ? `label-${currentElement.id}` : undefined;

    return (
        <div className="h-[500px] w-[300px] bg-gray-200 text-black">
            <aside>
                <h2 className="">Properties Panel</h2>
                {currentElement ?
                    <form>
                        <div>
                            <label>Field Label</label>
                            <input 
                                
                                value={currentElement.label}
                                onChange={(e) => updateElement(currentElement.id, 'label', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Placeholder Text</label>
                            <input
                                onChange={(e) => updateElement(currentElement.id, 'placeholder', e.target.value)}
                            />
                        </div>
                        {isCheckable && (
                        <div>
                            <label>Required Field</label>
                            <input 
                                type="checkbox" 
                                checked={checkableElement.checked}
                                onChange={(e) => updateElement(checkableElement.id, 'checked', e.target.value)}
                            />
                        </div>
                        )}
                        {hasValidationRules && (
                        <div>
                            {Object
                                .keys(currentElement.validation)
                                .map(key => {
                                    switch (key) {
                                        case 'min':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Min length</label>
                                                    <input id={labelInputId} onChange={(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, min: e.target.value})}/>
                                                </div>
                                        );  
                                        case 'max':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Max length</label>
                                                    <input id={labelInputId} onChange={(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, max: e.target.value})}/>
                                                </div>
                                        ); 
                                        case 'regex':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Regex</label>
                                                    <input id={labelInputId} onChange={(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, regex: e.target.value})}/>
                                                </div>
                                        ); 
                                        case 'types':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Type</label>
                                                    <select id={labelInputId} onChange={(e) => updateElement(currentElement.id, 'type', e.target.value)}>
                                                        <option value='text'>Text</option>
                                                        <option value='email'>Email</option>
                                                        <option value='password'>Password</option>
                                                    </select>
                                                </div>
                                            ); 
                                        case 'required':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Required</label>
                                                    <input id={labelInputId} type='checkbox' onChange={(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, required: e.target.value})}/>
                                                </div>
                                        ); 
                                        case 'checked':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Checked</label>
                                                    <input id={labelInputId} type='checkbox' onChange={(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, checked: e.target.value})}/>
                                                </div>
                                        ); 
                                    }
                                })
                            }
                        </div>
                        )}
                    </form>

                    :

                    <p>Click on the element you want to edit</p>
                }
            </aside>
        </div>
    )
}
/*    validation = {
        min: undefined,
        max: undefined,
        regex: undefined,
        types: ['text', 'email', 'password'],
        required: undefined,
        checked
      } */