'use client';
import { styleContainer } from "@/src/styles/styles";
import { CheckboxInputProps } from "@/src/types/props/props";

export default function CheckobxInput({ 
    id, 
    label, 
    required, 
    placeholder,
    defaultChecked,
    isPaletteItem, 
}: CheckboxInputProps) {
    const inputId = `input-${id}`;
    const isDraggable = isPaletteItem;

    return (
        <div className={styleContainer(isDraggable)}>
            <label 
                htmlFor={inputId} 
                className=""
            >
                {label}
                {required && isPaletteItem && <span className="">*</span>}
            </label>
            
            <input 
                id={inputId}
                type="checkbox"
                required={required}
                placeholder={placeholder}
                className=""
                checked={defaultChecked}
                disabled={isPaletteItem}
            />
        </div>
    );
}