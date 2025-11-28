'use client';
import { RadioInputProps } from "@/src/types/props/props";

export default function RadioInput({ 
    id, 
    label, 
    required, 
    placeholder,
    defaultChecked, 
}: RadioInputProps) {
    const inputId = `input-${id}`;

    return (
        <div className="">
            <label 
                htmlFor={inputId} 
                className=""
            >
                {label}
                {required && <span className="">*</span>}
            </label>
            
            <input 
                id={inputId}
                type="radio"
                required={required}
                placeholder={placeholder}
                className=""
                checked={defaultChecked}
            />
        </div>
    );
}