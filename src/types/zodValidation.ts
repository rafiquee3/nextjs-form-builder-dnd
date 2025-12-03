import * as z from "zod"; 

// PropertiesPanel
export const OptionSchema = z.string()
                        .trim()
                        .min(1, 'Option label cannot be empty.')
                        .max(20, 'Option label must be 20 characters or less.')
                        .regex(/^[a-zA-Z0-9\s]+$/, 'Option label can only contain letters, numbers, and spaces.');