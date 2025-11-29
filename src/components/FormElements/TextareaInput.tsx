'use client';
import { styleContainer } from "@/src/styles/styles";
import { TextInputProps } from "@/src/types/props/props";
import { Controller, useFormContext } from "react-hook-form";

export default function TextareaInput({ 
    id, 
    label, 
    required, 
    placeholder,
    isPaletteItem, 
}: TextInputProps) {
    const inputId = id;
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
                    type="textarea"
                    placeholder={placeholder}
                    className=""
                    disabled
                />
            </div>
        )
    }

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
                rules={{ required: required ? `${label} is required` : false }}
                render={({ field, fieldState }) => (
                    <div>
                        <input
                            {...field} // Spreads RHF props: onChange, onBlur, value, ref
                            type="textarea"
                            id={inputId}
                            className=""
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