import z from "zod";

export function schemaGenerator(syncData: []) {
    if (!syncData.length) return [];

    let allSchemas = [];

    syncData.forEach(field => {
        const {id, type, value, options, validation: {regex, min, max, required, checked}} = field;
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
                schema = schema.string('String error');
                if (min) {
                    schema = schema.min(min, `Must have at least ${min} characters.`);
                }
                if (max) {
                    schema = schema.max(max, `Must have at most ${max} characters.`);
                }
                if (regex && typeof regex === 'string') {
                    try {
                        // Konwertujemy string na obiekt RegExp
                        const regexObject = new RegExp(regex);
                        schema = schema.regex(regexObject, 'Invalid regex format.');
                    } catch (e) {
                        // Obsługa nieprawidłowego stringa Regex, aby uniknąć błędu
                        console.error(`Nieprawidłowy wzorzec Regex w konfiguracji: ${regex}`, e);
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

