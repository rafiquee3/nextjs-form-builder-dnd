'use client';
import { styleContainer } from "@/src/styles/styles";
import { RadioInputProps } from "@/src/types/props/props";

export default function RadioInput({ 
    id, 
    label, 
    required, 
    placeholder,
    defaultChecked, 
    isPaletteItem,
}: RadioInputProps) {
    const inputId = `input-${id}`;
    const isDraggable = isPaletteItem;

    return (
        <div className={styleContainer(isDraggable)} draggable={isDraggable}>
            <label 
                htmlFor={inputId} 
                className=""
            >
                {label}
                {required && isPaletteItem && <span className="">*</span>}
            </label>
            
            <input 
                id={inputId}
                type="radio"
                required={required}
                placeholder={placeholder}
                className=""
                checked={defaultChecked}
                disabled={isPaletteItem}
            />
        </div>
    );
}