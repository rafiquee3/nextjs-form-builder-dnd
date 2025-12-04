import * as z from "zod"; 

// PropertiesPanel
export const OptionSchema =  z
                        .string()
                        .trim()
                        .transform(val => val === '' ? undefined : val)
                        .optional()
                        .refine(
                            (val) => {
                                if (val === undefined) return true;

                                return z.string()
                                    .max(20, 'Option label must be 20 characters or less.')
                                    .regex(/^[a-zA-Z0-9\s]+$/, 'Option label can only contain letters, numbers, and spaces.')
                                    .safeParse(val).success;
                            }
                        );
                        
export const LabelSchema = z
                        .string()
                        .trim()
                        .transform(val => val === '' ? undefined : val)
                        .optional()
                        .refine(
                            (val) => {
                                if (val === undefined) return true;

                                return z.string()
                                    .max(20, 'Label must be 20 characters or less.')
                                    .regex(/^[a-zA-Z0-9\s]+:?$/, 'Label can only contain letters, numbers, and spaces.')
                                    .safeParse(val).success;
                            }
                        )

export const PlaceholderSchema = z
                        .string()
                        .trim()
                        .max(100, 'Placeholder must be 100 characters or less.')
                        .transform(val => val === '' ? undefined : val)
                        .optional();

export const IntNumberSchema = (field: string) => { return z
                        .number()
                        .int(`${field} must be a whole number (an integer).`)
                        .optional()
}

export const RegexSchema = z
                        .string()
                        .trim()
                        .max(200)
                        .transform(val => val === '' ? undefined : val)
                        .optional()
                        .refine((val) => {
                            try {
                                new RegExp(val!); 
                                return true;
                            } catch (e) {
                                return false;
                            }
                        }, 'Regex: the input is not a valid Regex pattern."')
                       

export const RadioCheckboxValueSchema = z
                        .string()
                        .trim()
                        .transform(val => (val === "" ? undefined : val))
                        .optional() 
                        .refine(
                            (val) => {
                                if (val === undefined) return true;

                                return z.string()
                                    .max(50, 'Value must be a maximum of 50 characters.')
                                    .regex(/^[a-z0-9_-]+$/, 'Value can only contain lowercase letters, numbers, hyphens (-), and underscores (_).')
                                    .safeParse(val).success;
                            },
                            'Value: the value is not valid'
                        );
                        
                        

