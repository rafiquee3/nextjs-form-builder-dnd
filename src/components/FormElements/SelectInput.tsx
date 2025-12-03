'use client';
import { styleContainer } from "@/src/styles/styles";
import { SelectInputProps } from "@/src/types/props/props";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectInput({ 
    id, 
    label, 
    required, 
    options, 
    isPaletteItem,
}: SelectInputProps) {
    const selectId = `select-${id}`;
    const isDraggable = isPaletteItem;
    const context = useFormContext();

    if (isPaletteItem) {
        return (
            <div className={styleContainer(isDraggable)} draggable={isDraggable}>
                <label 
                    htmlFor={selectId} 
                    className=""
                >
                    {label}
                </label>
                
                <select 
                    id={selectId}
                    className=""
                    disabled
                >
                    <option value="" disabled>Select an option</option>
                </select>
            </div>
        )
    }

    const {control} = context!;

    return (
        <div className={styleContainer(isDraggable)} draggable={isDraggable}>
            <label 
                htmlFor={selectId} 
                className=""
            >
                {label}
                {required && <span className="">*</span>}
            </label>
            <Controller
                name={selectId} 
                control={control}
                rules={{ required: required ? `${label} is required` : false }}
                render={({ field, fieldState }) => (
                    <div>
                        <select
                            {...field} // Spreads RHF props: onChange, onBlur, value, ref
                            id={selectId}
                            className=""
                            required={required}
                            value={field.value ?? ''}   
                        >
                            <option value="" disabled>Select option</option>
                            {options.map(opt => (
                            <option value={opt} key={opt}>{opt}</option>
                            ))}
                        </select>
                        {fieldState.error && (
                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />
        </div>
    );
}