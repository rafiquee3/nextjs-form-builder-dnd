'use client';
import { styleContainer, styleInputElement, styleLabelElement } from "@/src/styles/styles";
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
            <div className="bg-orange-300 p-4" draggable={isDraggable}>
                {label}
            </div>
        )
    }

    const {control} = context!;

    return (
        <div className="grow" draggable={isDraggable}>
            <label 
                htmlFor={selectId} 
                className={styleLabelElement}
            >
                <p>{label}</p>
                {required && <p className="text-red-400"> *</p>}
            </label>
            <Controller
                name={selectId} 
                control={control}
                rules={{ required: required ? `${label} is required` : false }}
                render={({ field, fieldState }) => (
                    <div className="">
                        <select
                            {...field} // Spreads RHF props: onChange, onBlur, value, ref
                            id={selectId}
                            className={styleInputElement}
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