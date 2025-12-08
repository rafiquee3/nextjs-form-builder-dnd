'use client';
import { styleInputElement, styleLabelElement } from "@/src/styles/styles";
import { CheckboxInputProps } from "@/src/types/props/props";
import { Controller, useFormContext } from "react-hook-form";

export default function CheckobxInput({ 
    id, 
    label, 
    required, 
    checked,
    value,
    isPaletteItem, 
}: CheckboxInputProps) {
    const inputId = `checkbox-${id}`;
    const isDraggable = isPaletteItem;
    const context = useFormContext();

    if (isPaletteItem) {
        return (
            <div className="p-4 bg-red-300">
                {label}
            </div>
        )
    }

    const {control} = context!;
    if (typeof value === 'boolean') value = '';
    return (
        <div className="grow flex gap-3">
            <label 
                htmlFor={inputId} 
                className={`font-bold flex gap-1`}
            >
                <p>{label}</p>
                {required && <p className="text-red-400"> *</p>}
            </label>
            <Controller
                name={inputId} 
                control={control}
                render={({ field, fieldState }) => {
                    return (
                        <div>
                            <input
                                    {...field} // Spreads RHF props: onChange, onBlur, value, ref
                                    type="checkbox"
                                    id={inputId}
                                    checked={checked}
                                    className={`${styleInputElement}`}
                                    required={required}
                                    value={value}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                            )}
                        </div>
                )}}
            />
        </div>
    );
}