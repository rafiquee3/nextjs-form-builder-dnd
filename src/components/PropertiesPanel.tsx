'use client';
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { CheckboxElement, FormElement, RadioElement } from "../types/FormElement";
import { IntNumberSchema, LabelSchema, OptionSchema, PlaceholderSchema, RadioCheckboxValueSchema, RegexSchema } from "../types/zodValidation";
import { addErrorMsg, clearErrorMsg } from "../utils/errorMsgUtils";

const renderErrorsMsg = (errorMsg: string[], field: string) => {
    return (
        <div>{errorMsg.length ? 
                    
            errorMsg.map((msg, i) => {
                const key = `mssg-key-${i}`;
                if(msg.toLowerCase().startsWith(field)) {
                    return (<p key={key}>*{msg}</p>)
                }
                else {
                    return '';
                }
            }) 
            
            : 

            ''
            }
        </div>
    );  
}

export default function PropertiesPanel() {
    const [currentElement, setCurrentElement] = useState<FormElement | null>(null);
    const [errorMsg, setErrorMsg] = useState<Array<string>>([]);
    const selectedId = useFormBuilderStore(store => store.selectedId);
    const elements = useFormBuilderStore(store => store.elements);
    const updateElement = useFormBuilderStore(store => store.updateElementProperty);
    const syncDataInStore = useFormBuilderStore(store => store.commitCfgToElements);
    const resetCheckedAttr = useFormBuilderStore(store => store.resetCheckedAttr);

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
            setErrorMsg([]);
            setCurrentElement(elementToEdit || null);
        } else {
            setCurrentElement(null);
        }
    }, [selectedId, elements])

    const checkableElement = currentElement as (CheckboxElement | RadioElement);
    const hasValidationRules = currentElement ? Object.keys(currentElement?.validation).length > 0 : false;
    const optionsInputRef = useRef<HTMLInputElement>(null);
    const optionsSelectRef = useRef<HTMLSelectElement>(null);

    const labelInputId = currentElement ? `label-${currentElement.id}` : undefined;
    const optionsInputId = currentElement ? `options-${currentElement.id}` : undefined;
    const nameInputId = currentElement ? `name-${currentElement.id}` : undefined;
    const typeInputId = currentElement ? `type-${currentElement.id}` : undefined;
    const placeholderInputId = currentElement ? `placeholder-${currentElement.id}` : undefined;
    const minInputId = currentElement ? `min-${currentElement.id}` : undefined;
    const maxInputId = currentElement ? `max-${currentElement.id}` : undefined;
    const requiredInputId = currentElement ? `required-${currentElement.id}` : undefined;
    const checkedInputId = currentElement ? `checked-${currentElement.id}` : undefined;
    const regexInputId = currentElement ? `regex-${currentElement.id}` : undefined;

    const handleSelectAction = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const buttonAction = (e.target as HTMLDivElement).closest('button');

        if (currentElement && buttonAction) {
            const currentOptions = (currentElement as any).options || [];

            if (buttonAction.id === 'addOptBttn' && optionsInputRef.current) {
                const inputValue = optionsInputRef.current.value;
                const hasDuplicates = currentOptions.includes(inputValue);
                const validation = OptionSchema.safeParse(inputValue);
                if (!validation.success) {
                    addErrorMsg(validation, errorMsg, setErrorMsg);
                    return;
                }
          
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
        if (errorMsg.length) return;
        console.log('zzz')
        syncDataInStore(selectedId);

    }
    console.log('err', errorMsg)
    return (
        <div className="h-[500px] w-[300px] bg-gray-200 text-black">
            <aside>
                <h2 className="">Properties Panel</h2>
                {currentElement ?
                    <form key={selectedId} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor={labelInputId}>Label</label>
                            <input 
                                id={labelInputId}
                                value={currentElement.label}
                                onChange={(e) => {
                                    updateElement(currentElement.id, 'label', e.target.value);
                                    if (errorMsg.length) {
                                        clearErrorMsg('label', errorMsg, setErrorMsg);
                                    }
                                }}
                                onBlur={(e) => {
                                    handleLocalChange('label', e.target.value);
                                    const validation = LabelSchema.safeParse(e.target.value);
                                    if (!validation.success) {
                                        addErrorMsg(validation, errorMsg, setErrorMsg);
                                        updateElement(currentElement.id, 'label', '');
                                    }
                                }}
                            />
                            <div>{renderErrorsMsg(errorMsg, 'label')}</div> 
                        </div>
                        {currentElement.type === 'select'  && 
                        <div onClick={handleSelectAction}>
                            <label htmlFor={optionsInputId}>Options</label>
                            {
                            <>
                            <select ref={optionsSelectRef} id={optionsInputId}>
                                <option disabled>Select option</option>
                                {currentElement.options &&
                                currentElement.options.map(opt => 
                                <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <button id='remOptBttn'>rem</button>
                            </>
                            }
                            <input 
                                id='opts-ref' 
                                ref={optionsInputRef} 
                                onChange={() => {
                                    if (errorMsg.length) {
                                        clearErrorMsg('option', errorMsg, setErrorMsg);
                                    }
                                }} 
                                type="text">
                            </input>
                            <button id='addOptBttn'>add</button>
                            <div>{renderErrorsMsg(errorMsg, 'option')}</div>   
                        </div>
                        }
                        {currentElement.type === 'radio' &&
                            <div>
                                <label htmlFor={nameInputId}>Group name</label>
                                <input 
                                    id={nameInputId} 
                                    value={liveCfg?.name ?? ''}
                                    onChange={(e) => handleLocalChange('name', e.target.value)}
                                />
                            </div>
                        }
                        {['text', 'number', 'email', 'date', 'password'].includes(currentElement.type) && 
                            <div>
                                <label htmlFor={typeInputId}>Type</label>
                                <select 
                                    id={typeInputId} 
                                    value={currentElement.type}
                                    onChange={(e) => {
                                        const newType = e.target.value;
                                        handleLocalChange('type', newType);
                                        updateElement(currentElement.id, 'type', newType)
                                    }}
                                >
                                    <option value='text'>Text</option>
                                    <option value='email'>Email</option>
                                    <option value='password'>Password</option>
                                    <option value='number'>Number</option>
                                    <option value='date'>Date</option>
                                </select>
                            </div>
                        }
                        {(currentElement.type === 'text' || currentElement.type === 'textarea') &&
                            <div>
                                <label htmlFor={placeholderInputId}>Placeholder Text</label>
                                <input
                                    id={placeholderInputId}
                                    value={liveCfg?.placeholder ?? ''}
                                    onChange={(e) => {
                                        if (errorMsg.length) clearErrorMsg('placeholder', errorMsg, setErrorMsg);
                                        handleLocalChange('placeholder', e.target.value)
                                    }}
                                    onBlur={(e) => {
                                        const validation = PlaceholderSchema.safeParse(e.target.value);
                                        if (!validation.success) {
                                            addErrorMsg(validation, errorMsg, setErrorMsg);
                                            updateElement(currentElement.id, 'placeholder', '');
                                        }
                                    }}
                                />
                                <div>{renderErrorsMsg(errorMsg, 'placeholder')}</div>   
                            </div>
                        }
                        {hasValidationRules && (
                        <div>
                            {Object
                                .keys(currentElement.validation)
                                .map(key => {
                                    switch (key) {
                                        case 'min':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={minInputId}>Min length</label>
                                                    <input 
                                                        id={minInputId} 
                                                        value={liveCfg?.min ?? ''}
                                                        type="number"
                                                        step='1'
                                                        onChange={(e) => {
                                                            if (errorMsg.length) {
                                                                clearErrorMsg('min', errorMsg, setErrorMsg);
                                                            }
                                                            handleLocalChange('min', e.target.value);
                                                            }
                                                        }
                                                        onBlur={(e) => {
                                                            const MinSchema = IntNumberSchema('Min');
                                                            const validation = MinSchema.safeParse(Number(e.target.value));
                                                            
                                                            if (!validation.success) {
                                                                addErrorMsg(validation, errorMsg, setErrorMsg);
                                                                liveCfg.min = '';
                                                            }
                                                        }}
                                                    />
                                                    <div>{renderErrorsMsg(errorMsg, 'min')}</div>  
                                                </div>
                                        );  
                                        case 'max':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={maxInputId}>Max length</label>
                                                    <input 
                                                        id={maxInputId} 
                                                        value={liveCfg?.max ?? ''}
                                                        type='number'
                                                        step='1'
                                                        onChange={(e) => {
                                                            if (errorMsg.length) {
                                                                clearErrorMsg('max', errorMsg, setErrorMsg);
                                                            }
                                                            handleLocalChange('max', e.target.value);
                                                            }
                                                        }
                                                        onBlur={(e) => {
                                                            const MaxSchema = IntNumberSchema('Max');
                                                            const validation = MaxSchema.safeParse(Number(e.target.value));
                                                            
                                                            if (!validation.success) {
                                                                addErrorMsg(validation, errorMsg, setErrorMsg);
                                                                liveCfg.max = '';
                                                            }
                                                        }} 
                                                    />
                                                    <div>{renderErrorsMsg(errorMsg, 'max')}</div>  
                                                </div>
                                        ); 
                                        case 'regex':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={regexInputId}>Regex</label>
                                                    <input 
                                                        id={regexInputId} 
                                                        value={liveCfg?.regex ?? ''}
                                                        onChange={(e) => {
                                                            if (errorMsg.length) {
                                                                clearErrorMsg('regex', errorMsg, setErrorMsg)
                                                            }
                                                            handleLocalChange('regex', e.target.value)
                                                        }}
                                                        onBlur={(e) => {
                                                            const validation = RegexSchema.safeParse(e.target.value);
                      
                                                            if (!validation.success) {
                                                                addErrorMsg(validation, errorMsg, setErrorMsg);
                                                                liveCfg.regex = '';
                                                            }
                                                        }} 
                                                    />
                                                    <div>{renderErrorsMsg(errorMsg, 'regex')}</div> 
                                                </div>
                                        ); 
                                        case 'required':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={requiredInputId}>Required</label>
                                                    <input 
                                                        id={requiredInputId} 
                                                        type='checkbox'
                                                        checked={liveCfg?.required ?? ''} 
                                                        onChange={(e) => {
                                                            handleLocalChange('required', e.target.checked);
                                                            updateElement(checkableElement.id, 'required', e.target.checked);
                                                    }}/>
                                                </div>
                                        ); 
                                        case 'checked':
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={checkedInputId}>Checked</label>
                                                    <input 
                                                        id={checkedInputId} 
                                                        type='checkbox'
                                                        checked={
                                                            liveCfg?.checked ?? ''
                                                        } 
                                                        onChange={(e) => {
                                                            if (currentElement.type === 'radio') {
                                                                const needReset = Object.keys(formCfg)
                                                                                        .filter(el => formCfg[el]?.name === liveCfg?.name && formCfg[el]?.name !== undefined)
                                                                                        .length > 1 ? true : false;
                                                                if (needReset) {
                                                                  resetCheckedAttr();    
                                                                };
                                                            }
                                                            handleLocalChange('checked', e.target.checked);
                                                            updateElement(checkableElement.id, 'checked', e.target.checked);
                                                    }}/>
                                                    <label htmlFor={`${checkedInputId}-value`}>Value</label>
                                                    <input 
                                                        id={`${checkedInputId}-value`}
                                                        value={liveCfg?.value ?? ''}
                                                        onChange={(e) => {
                                                            if (errorMsg.length) {
                                                                clearErrorMsg('value', errorMsg, setErrorMsg);
                                                            }
                                                            handleLocalChange('value', e.target.value)
                                                            }
                                                        }
                                                        onBlur={(e) => {
                                                            const validation = RadioCheckboxValueSchema.safeParse(e.target.value);
                                                            if (!validation.success) {
                                                                addErrorMsg(validation, errorMsg, setErrorMsg);
                                                                liveCfg.value = '';
                                                            }
                                                        }}     
                                                    />
                                                    <div>{renderErrorsMsg(errorMsg, 'value')}</div> 
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
