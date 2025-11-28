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
                                value={currentElement.label}
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
                    </form>

                    :

                    <p>Click on the element you want to edit</p>
                }
            </aside>
        </div>
    )
}