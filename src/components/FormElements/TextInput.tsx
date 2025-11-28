'use client';
import { styleContainer } from "@/src/styles/styles";
import { TextInputProps } from "@/src/types/props/props";

export default function TextInput({ 
    id, 
    label, 
    required, 
    placeholder,
    isPaletteItem, 
}: TextInputProps ) {
    const inputId = `input-${id}`;
    const isDraggable = isPaletteItem;

    return (
        <div className={styleContainer(isDraggable)} draggable={isDraggable}>
            <label 
                htmlFor={inputId} 
                className=""
            >
                {label}
                {required && !isPaletteItem && <span className="">*</span>}
            </label>
            
            <input 
                id={inputId}
                type="text"
                required={required}
                placeholder={placeholder}
                className=""
                disabled={isPaletteItem}
            />
        </div>
    );
}