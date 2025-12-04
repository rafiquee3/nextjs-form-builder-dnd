import z from "zod";

export function schemaGenerator(syncData: []) {
    if (!syncData.length) return undefined;

    let allSchemas = [];

    syncData.forEach(field => {
        const {id, type, value, validation: {regex, min, max, required, checked}} = field;
        const acc = {}
        acc.type = type;
        acc.id = id;
        acc.validation = field.validation;
        acc.data = field;
        acc.value = value;

        let schema = z;
        

        switch (type) {
            case 'text':
            case 'textarea':
                schema = z.string('String error');
                    if (min !== undefined) {
                        schema = schema.min(min, `Must have at least ${min} characters.`);
                    }
                    if (max !== undefined) {
                        schema = schema.max(max, `Must have at most ${max} characters.`);
                    }
                    if (regex !== undefined) {
                        schema = schema.regex(regex, 'Invalid regex format.');
                    }
                    break;
            case 'number':
                schema = z.coerce.number('The value must be a number.');
                if (min !== undefined && typeof min === 'number') {
                    schema = schema.min(min, `Must be greater than or equal to ${min}.`);
                }
                if (max !== undefined && typeof max === 'number') {
                    schema = schema.max(max, `Must be less than or equal to ${max}.`);
                }
                break;
            case 'date':
                schema = z.coerce.date('Invalid date format.');
                break;
            case 'email':
                schema = schema.email('Invalid email format.');
                break;
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

