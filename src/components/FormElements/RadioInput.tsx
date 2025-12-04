'use client';
import { useFormBuilderStore } from "@/src/store/useFormBuilderStore";
import { styleContainer } from "@/src/styles/styles";
import { RadioInputProps } from "@/src/types/props/props";
import { Controller, useFormContext } from "react-hook-form";

export default function RadioInput({ 
    id, 
    label, 
    required,
    checked, 
    name, 
    isPaletteItem,
    value,
}: RadioInputProps) {
    const inputId = `radio-${id}`;
    const isDraggable = isPaletteItem;
    const context = isPaletteItem ? null : useFormContext();

    if (isPaletteItem) {
        return (
            <div className={styleContainer(isDraggable)} draggable={isDraggable}>
            <label 
                htmlFor={inputId} 
                className=""
            >
                {label}
            </label>
            
            <input 
                id={inputId}
                type="radio"
                className=""
                disabled
            />
        </div>
        )
    }
    console.log('checked', checked)
    const {control} = context!;

    return (
        <div className={styleContainer(isDraggable)} draggable={isDraggable}>
            <label 
                htmlFor={inputId} 
                className=""
            >
                {label}
                {required && <span className="">*</span>}
            </label>
            <Controller
                name={inputId} 
                control={control}
                render={({ field, fieldState }) => (
                    <div>
                       <input
                            {...field} // Spreads RHF props: onChange, onBlur, value, ref
                            type="radio"
                            id={inputId}
                            className=""
                            required={required}
                            checked={checked}
                            value={value}
                            name={name}
                        />
                        {fieldState.error && (
                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />
        </div>
    );
}