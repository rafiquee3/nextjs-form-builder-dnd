'use client';
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { CheckboxElement, FormElement, RadioElement } from "../types/FormElement";

export default function PropertiesPanel() {
    const [currentElement, setCurrentElement] = useState<FormElement | null>(null);
    const selectedId = useFormBuilderStore(store => store.selectedId);
    const elements = useFormBuilderStore(store => store.elements);
    const updateElement = useFormBuilderStore(store => store.updateElementProperty);
    const syncDataInStore = useFormBuilderStore(store => store.commitCfgToElements);
    const [localProperties, setLocalProperties] = useState([]);

    const updateFormCfg = useFormBuilderStore(store => store.updateFormCfg);

    const handleLocalChange =  useCallback((field: string, value: any) => {
        updateFormCfg(selectedId, field, value);
    }, [selectedId, updateFormCfg]);

    const formCfg = useFormBuilderStore(store => store.formCfg); 
    const initializeCfg = useFormBuilderStore(store => store.initializeCfg);
    const liveCfg = selectedId ? formCfg[selectedId] : null;

    useEffect(() => {
        if (currentElement && !liveCfg) {
            initializeCfg(currentElement);
        }
    }, [currentElement, initializeCfg])

    useEffect(() => {
        if (selectedId) {
            const elementToEdit = elements.find(el => el.id === selectedId);
            setCurrentElement(elementToEdit || null);
        } else {
            setCurrentElement(null);
        }
    }, [selectedId, elements])

    const checkableElement = currentElement as (CheckboxElement | RadioElement);
    const hasValidationRules = currentElement ? Object.keys(currentElement?.validation).length > 0 : false;
    const labelInputId = currentElement ? `label-${currentElement.id}` : undefined;
    const optionsInputRef = useRef<HTMLInputElement>(null);
    const optionsSelectRef = useRef<HTMLSelectElement>(null);

    const handleSelectAction = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const buttonAction = (e.target as HTMLDivElement).closest('button');

        if (currentElement && buttonAction) {
            const currentOptions = (currentElement as any).options || [];

            if (buttonAction.id === 'addOptBttn' && optionsInputRef.current) {
                const inputValue = optionsInputRef.current.value;
                const hasDuplicates = currentOptions.includes(inputValue);

                if (inputValue && !hasDuplicates) {
                    updateElement(currentElement.id, 'options', [...currentOptions, inputValue]);
                    optionsInputRef.current.value = '';
                }
            } else if (buttonAction.id === 'remOptBttn' && optionsSelectRef.current) {
                const selectValue = optionsSelectRef.current.value;
                const hasDuplicates = currentOptions.includes(selectValue);

                if (selectValue && hasDuplicates) {
                    updateElement(currentElement.id, 'options', [...currentOptions.filter((opt: string) => opt !== selectValue)]);
                    optionsSelectRef.current.value = '';
                }
            }   
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        syncDataInStore(selectedId);
/*         if (!currentElement) return;

        if (localProperties.placeholder) {
            updateElement(currentElement.id, 'placeholder', localProperties.placeholder);
            updateElement(currentElement.id, 'validation', {...currentElement.validation, placeholder: localProperties.placeholder});
        }

        if (localProperties.regex) {
            updateElement(currentElement.id, 'validation', {...currentElement.validation, regex: localProperties.placeholder});
        }

        if (localProperties.name) {
            updateElement(currentElement.id, 'name', localProperties.name);
            updateElement(currentElement.id, 'validation', {...currentElement.validation, name: localProperties.name});
        }

        if (localProperties.max) {
            updateElement(currentElement.id, 'validation', {...currentElement.validation, max: localProperties.max});
        }

        if (localProperties.min) {
            updateElement(currentElement.id, 'validation', {...currentElement.validation, min: localProperties.min});
        } */
    }

    console.log('cfg', formCfg)
    console.log('elements', elements)
    return (
        <div className="h-[500px] w-[300px] bg-gray-200 text-black">
            <aside>
                <h2 className="">Properties Panel</h2>
                {currentElement ?
                    <form key={selectedId} onSubmit={handleSubmit}>
                        <div>
                            <label>Label</label>
                            <input 
                                value={currentElement.label}
                                onChange={(e) => updateElement(currentElement.id, 'label', e.target.value)}
                            />
                        </div>
                        {currentElement.type === 'select'  && 
                            <div onClick={handleSelectAction}>
                                <label>Options</label>
                                {
                                <>
                                <select ref={optionsSelectRef}>
                                    <option disabled>Select option</option>
                                    {currentElement.options &&
                                    currentElement.options.map(opt => 
                                    <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <button id='remOptBttn'>rem</button>
                                </>
                                }
                                <input ref={optionsInputRef} type="text"></input>
                                <button id='addOptBttn'>add</button>
                            </div>
                        }
        
                        {hasValidationRules && (
                        <div>
                            {Object
                                .keys(currentElement.validation)
                                .map(key => {
                                    switch (key) {
                                        case 'placeholder':
                                            return (
                                                <div key={key}>
                                                    <label>Placeholder Text</label>
                                                    <input
                                                        value={liveCfg?.placeholder ?? ''}
                                                        onChange={(e) => handleLocalChange('placeholder', e.target.value)}
                                                    />
                                                </div>
                                            );
                                        case 'min':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Min length</label>
                                                    <input 
                                                        id={labelInputId} 
                                                        value={liveCfg?.min ?? ''}
                                                        onChange={
                                                            (e) => handleLocalChange('min', e.target.value)

                                                            //updateElement(currentElement.id, 'validation', {...currentElement.validation, min: e.target.value})
                                                        }/>
                                                </div>
                                        );  
                                        case 'max':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Max length</label>
                                                    <input 
                                                        id={labelInputId} 
                                                        value={liveCfg?.max ?? ''}
                                                        onChange={
                                                            (e) => handleLocalChange('max', e.target.value)
                                                            //(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, max: e.target.value}

                                                            }
                                                    />
                                                </div>
                                        ); 
                                        case 'regex':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Regex</label>
                                                    <input 
                                                        id={labelInputId} 
                                                        value={liveCfg?.regex ?? ''}
                                                        onChange={
                                                             (e) => handleLocalChange('regex', e.target.value)
                                                            //(e) => updateElement(currentElement.id, 'validation', {...currentElement.validation, regex: e.target.value})
                                                        }
                                                    />
                                                </div>
                                        ); 
                                        case 'types':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Type</label>
                                                    <select 
                                                        id={labelInputId} 
                                                        value={currentElement.type}
                                                        onChange={(e) => updateElement(currentElement.id, 'type', e.target.value)}
                                                    >
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
                                                    <input 
                                                        id={labelInputId} 
                                                        value={labelInputId ?? undefined}
                                                        checked={currentElement.validation.required ?? false}
                                                        type='checkbox' onChange={(e) => {
                                                            updateElement(currentElement.id, 'validation', {...currentElement.validation, required: e.target.checked});
                                                            updateElement(checkableElement.id, 'required', e.target.checked);
                                                    }}/>
                                                </div>
                                        ); 
                                        case 'checked':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Checked</label>
                                                    <input id={labelInputId} 
                                                        type='checkbox' 
                                                        checked={currentElement.validation.checked}
                                                        onChange={(e) => {
                                                            updateElement(currentElement.id, 'validation', {...currentElement.validation, checked: e.target.value});
                                                            updateElement(checkableElement.id, 'checked', e.target.value);
                                                    }}/>
                                                </div>
                                        );
                                        case 'name': 
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={labelInputId}>Group name</label>
                                                    <input 
                                                        id={labelInputId} 
                                                        value={liveCfg?.name ?? ''}
                                                        onChange={(e) => handleLocalChange('name', e.target.value)}
                                                    />
                                                </div>
                                        );
                                    }
                                })
                            }
                        </div>
                        )}
                        <button type='submit'>Save</button>
                    </form>

                    :

                    <p>Click on the element you want to edit</p>
                }
            </aside>
        </div>
    )
}
