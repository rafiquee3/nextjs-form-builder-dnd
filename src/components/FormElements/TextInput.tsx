'use client';
import { TextInputProps } from "@/src/types/props/props";

export default function TextInput({ 
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
                type="text"
                required={required}
                placeholder={placeholder}
                className=""
            />
        </div>
    );
}