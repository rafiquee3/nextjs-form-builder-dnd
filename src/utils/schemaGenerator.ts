import z from "zod";
import { SchemaData, SyncData } from "../types/FormElement";

export function schemaGenerator(syncData: SyncData) {
    if (!syncData.length) return [];

    let allSchemas: SchemaData[] = [];

    syncData.forEach((field: any) => {
        const {id, type, value, options, required, validation: {regex, min, max, checked}} = field;
        const acc: SchemaData = {
            type,
            id,
            value,
            validation: field.validation,
            data: field,
            schema: undefined
        }

        let schema: any = z;

        switch (type) {
            case 'text':
            case 'textarea':
                schema = schema.string('Value must be of type string.');
                if (min) {
                    schema = schema.min(min, `Must have at least ${min} characters.`);
                }
                if (max) {
                    schema = schema.max(max, `Must have at most ${max} characters.`);
                }
                if (regex && typeof regex === 'string') {
                    try {
                        const regexObject = new RegExp(regex);
                        schema = schema.regex(regexObject, 'Invalid regex format.');
                    } catch (e) {
                        console.error(`Invalid Regex pattern in configuration: ${regex}`);
                    }
                }
                break;
            case 'number':
                schema = z.coerce.number('The value must be a number.');
                if (min && typeof min === 'number') {
                    schema = schema.min(min, `Must be greater than or equal to ${min}.`);
                }
                if (max && typeof max === 'number') {
                    schema = schema.max(max, `Must be less than or equal to ${max}.`);
                }
                break;
            case 'date':
                schema = schema.coerce.date('Invalid date format.');
                break;
            case 'email':
                schema = schema.string().email('Invalid email format.');
                break;
            case 'radio':
            case 'checkbox':
                schema  = schema.string();
                if (required) {
                    schema = schema.min(1, 'This field is required.');
                }
                break;
            case 'select':
                schema = z.enum(options);   
        }

        if (!required) {
            schema = schema.optional().nullable();
        }

        if (schema == z) return;
        acc.schema = schema;
        allSchemas.push(acc);
    });
    return allSchemas;
}

