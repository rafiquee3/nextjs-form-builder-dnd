'use client';
import { SelectInputProps } from "@/src/types/props/props";

export default function SelectInput({ 
    id, 
    label, 
    required, 
    options, 
}: SelectInputProps) {
    const selectId = `select-${id}`;

    return (
        <div className="">
            <label 
                htmlFor={selectId} 
                className=""
            >
                {label}
                {required && <span className="">*</span>}
            </label>
            
            <select 
                id={selectId}
                required={required}
                className=""
            >
                <option value="" disabled selected>Select an option</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}