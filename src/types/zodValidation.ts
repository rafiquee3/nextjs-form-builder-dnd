import * as z from "zod"; 

// PropertiesPanel
export const OptionSchema =  z
                        .string()
                        .trim()
                        .min(1, 'Option label cannot be empty.')
                        .max(20, 'Option label must be 20 characters or less.')
                        .regex(/^[a-zA-Z0-9\s]+$/, 'Option label can only contain letters, numbers, and spaces.');

export const LabelSchema = z
                        .string()
                        .trim()
                        .min(1, 'Label cannot be empty.')
                        .max(20, 'Label must be 20 characters or less.')
                        .regex(/^[a-zA-Z0-9\s]+:?$/, 'Label can only contain letters, numbers, and spaces.');

export const PlaceholderSchema = z
                        .string()
                        .trim()
                        .max(100, 'Placeholder must be 100 characters or less.')
                        .optional();
export const IntNumberSchema = (field: string) => { return z
                        .number()
                        .int({ 
            // The int() method expects an object with a 'message' property for custom errors.
            message: `${field} must be a whole number (an integer).` 
        })}