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
                                    .max(20)
                                    .regex(/^[a-zA-Z0-9\s]+$/)
                                    .safeParse(val).success;
                            }, 'Option label can only contain letters, numbers, and spaces, max 20 characters.'
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
                                    .max(20)
                                    .regex(/^[a-zA-Z0-9\s]+:?$/)
                                    .safeParse(val).success;
                            }, 'Label can only contain letters, numbers, and spaces, max 20 characters.'
                        )

export const PlaceholderSchema = z
                        .string()
                        .trim()
                        .max(2, 'Placeholder must be 100 characters or less.')
                        .transform(val => val === '' ? undefined : val)
                        .optional();

export const IntNumberSchema = (field: string) => { return z
                        .number()
                        .int(`${field} must be a whole number (an integer).`)
                        .min(1, `${field}: the ${field} value must be greater than zero.`)
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
                                    .max(50)
                                    .regex(/^[a-z0-9_-]+$/)
                                    .safeParse(val).success;
                            },
                            'Value: Value can only contain lowercase letters, numbers, hyphens (-), and underscores (_), max 50 characters.'
                        );
export const RadioGroupNameSchema = z.string()
    .trim()
    .min(2, 'Name: the field name (group key) must be at least 2 characters long.')
    .max(30, 'Name: the field name cannot exceed 30 characters.')
    .regex(/^[a-z]+[a-z0-9_-]*$/, 'Name: the name must start with a lowercase letter and can only contain lowercase letters, numbers, hyphens (-), and underscores (_).');
                        

