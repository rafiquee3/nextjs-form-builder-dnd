'use client';
import { styleContainer } from "@/src/styles/styles";
import { SelectInputProps } from "@/src/types/props/props";

export default function SelectInput({ 
    id, 
    label, 
    required, 
    options, 
    isPaletteItem,
}: SelectInputProps) {
    const selectId = `select-${id}`;
    const isDraggable = isPaletteItem;

    return (
        <div className={styleContainer(isDraggable)} draggable={isDraggable}>
            <label 
                htmlFor={selectId} 
                className=""
            >
                {label}
                {required && isPaletteItem && <span className="">*</span>}
            </label>
            
            <select 
                id={selectId}
                required={required}
                className=""
                disabled={isPaletteItem}
            >
                <option value="" disabled selected>Select an option</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}