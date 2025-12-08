'use client';
import { styleContainer, styleInputElement, styleLabelElement } from "@/src/styles/styles";
import { TextInputProps } from "@/src/types/props/props";
import { Controller, useFormContext } from "react-hook-form";

export default function TextareaInput({ 
    id, 
    label, 
    required, 
    placeholder,
    isPaletteItem, 
}: TextInputProps) {
    const inputId = `textarea-${id}`
    const isDraggable = isPaletteItem;
    const context = useFormContext();

     if (isPaletteItem) {
        return (
           <div className="bg-violet-300 p-4" draggable={isDraggable}>
                {label}
            </div>
        )
    }

    const {control} = context!;

    return (
        <div className="grow" draggable={isDraggable}>
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
                rules={{ required: required ? `${label} is required` : false }}
                render={({ field, fieldState }) => (
                    <div className="w-full">
                        <textarea
                            {...field} // Spreads RHF props: onChange, onBlur, value, ref
                            value={field.value ?? ''}
                            required={required ?? false}
                            placeholder={placeholder ?? ''}
                            id={inputId}
                            rows={2}
                            className={`${styleInputElement}`}
                        >
                        </textarea>
                        {fieldState.error && (
                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />
        </div>
    );
}