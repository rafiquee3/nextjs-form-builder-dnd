'use client';
import { useFormBuilderStore } from "@/src/store/useFormBuilderStore";
import { styleContainer, styleInputElement, styleLabelElement } from "@/src/styles/styles";
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
        <div className="p-4 bg-gray-400" draggable={isDraggable}>
            {label}
        </div>
        )
    }
    const {control} = context!;

    return (
        <div className="grow flex gap-3" draggable={isDraggable}>
            <label 
                htmlFor={inputId} 
                className={styleLabelElement}
            >
                <p>{label}</p>
                {required && <p className="text-red-400"> *</p>}
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
                            className={styleInputElement}
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