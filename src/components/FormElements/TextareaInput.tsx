'use client';
import { TextInputProps } from "@/src/types/props/props";

export default function TextareaInput({ 
    id, 
    label, 
    required, 
    placeholder 
}: TextInputProps) {
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
                type="textarea"
                required={required}
                placeholder={placeholder}
                className=""
            />
        </div>
    );
}