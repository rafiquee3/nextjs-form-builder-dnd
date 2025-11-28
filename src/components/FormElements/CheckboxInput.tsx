'use client';
import { CheckboxInputProps } from "@/src/types/props/props";

export default function CheckobxInput({ 
    id, 
    label, 
    required, 
    placeholder,
    defaultChecked 
}: CheckboxInputProps) {
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
                type="checkbox"
                required={required}
                placeholder={placeholder}
                className=""
                checked={defaultChecked}
            />
        </div>
    );
}