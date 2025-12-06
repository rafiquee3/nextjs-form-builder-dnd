import { FormElement, RadioElement, SyncData } from "../types/FormElement";

export function generateHTML(elements: FormElement[]): string {
    let htmlContent = '';
    let isRadioRendered = false;
    
    elements.forEach((element: FormElement | any) => {
        const requiredAttr = element.required ? 'required' : '';
        const checkedAttr = element.checked ? 'checked' : '';
        const minAttr = element.min ? `required ${element.type === "number" ? `min="${element.min}"` : `minlength="${element.min}"`}` : '';
        const maxAttr = element.max ? `required ${element.type === "number" ? `max="${element.max}"` : `maxlength="${element.max}"`}` : '';
        const regexAttr = element.regex ? `required pattern="${element.regex}"` : '';

        let fieldAttr: any = `${requiredAttr} ${checkedAttr} ${minAttr} ${maxAttr} ${regexAttr}`.split(/\s+/);
            fieldAttr = new Set(fieldAttr);
            fieldAttr = Array.from(fieldAttr);
            fieldAttr = fieldAttr.join(' ');

        switch (element.type) {
            case 'text':
            case 'number':
            case 'email':
            case 'date':
            case 'password':
            case 'checkbox':
            case 'textarea':
                const inputType = element.type === 'textarea' ? 'textarea' : 'input';
                const inputAttrs = element.type !== 'textarea' ? `type="${element.type}"` : '';
                
                htmlContent += `
                    <div class="form-group">
                        <label for="${element.id}">${element.label}</label>
                        <${inputType} ${inputAttrs} id="${element.id}" name="${element.id}" ${fieldAttr} class="form-control"${element.type === 'textarea' ? '></textarea>' : ' />'}
                    </div>`;
                break;

            case 'select':
                const optionsHtml = element.options?.map((opt: string) =>
                    `<option value="${opt}">${opt}</option>`
                ).join('\n        ') || '';

                htmlContent += `
                    <div class="form-group">
                        <label for="${element.id}">${element.label}</label>
                        <select id="${element.id}" name="${element.id}" ${fieldAttr} class="form-control">
                            ${optionsHtml}
                        </select>
                    </div>`;
                break;
            
            case 'radio':
                if (!isRadioRendered) {
                    isRadioRendered = true;

                    const radioGroups = elements.filter(el=> el.type === 'radio').reduce((acc, current) => {
                       if (acc[current.name]) {
                        acc[current.name].push(current)
                       } else {
                        acc[current.name] = [current];
                       }
                       return acc;
                    }, {} as {[key: string]: FormElement[]})

                    const radioElArr = Object.values(radioGroups);

                    radioElArr.sort((a: any, b: any) => {
                        const nameA = a[0].name; 
                        const nameB = b[0].name;

                        return nameA.localeCompare(nameB);
                    })
                    
          

                    radioElArr.forEach(el => {
                        htmlContent += `<div><label>Radio group</label>`;
                        el.forEach((element: RadioElement | any) => {
                            htmlContent += ` 
                                <div class="form-check form-check-inline">
                                    <input type="radio" id="${element.id}" name="${element.name}" value="${element.value}" ${fieldAttr} class="form-check-input">
                                    <label for="${element.id}" class="form-check-label">${element.label}</label>
                                </div>
                            `
                        });
                        htmlContent += `</div>`;
                    })
                    break;
                }
                break;
            default:
                break;
        }
    });

    return `
        <form id="dynamic-form" class="form-cnt">
            ${htmlContent.trim()}
            <div class="form-group submit-btn">
                <button type="submit">Submit Form</button>
            </div>
        </form>`;
}

export function generateRHFComponents(elements: FormElement[], controlName: string = 'control'): string {
    let jsxContent = '';
    let isRadioRendered = false;

    elements.forEach((element: FormElement | any) => {
        const rules = element.required ? `, rules: {required: 'This field is required.'}` : '';
        const nameAttr = element.id;
        const requiredAttr = element.required ? 'required' : '';
        const checkedAttr = element.checked ? 'checked' : '';

        switch (element.type) {
            case 'text':
            case 'number':
            case 'email':
            case 'date':
            case 'password':
            case 'checkbox':
            case 'textarea':
                const inputType = element.type === 'textarea' ? 'textarea' : 'input';
                const inputAttrs = element.type !== 'textarea' ? `type="${element.type}"` : '';
                
                jsxContent += `
                    <Controller
                        name="${nameAttr}"
                        control={${controlName}}
                        render={({field, fieldState}) => (
                            <div className="form-group">
                                <label htmlFor="${nameAttr}">${element.label}</label>
                                <${inputType} ${inputAttrs} id="${nameAttr}" {...field} className="form-control" ${requiredAttr} ${checkedAttr}/>
                                {fieldState.error && (
                                    <p className="error-msg">{fieldState.error.message}</p>
                                )}
                            </div>
                        )}
                        ${rules}
                    />`;
                break;

            case 'select':
                const optionsJsx = element.options?.map((opt: string) =>
                    `<option value="${opt}">${opt}</option>`
                ).join('\n                    ') || '';

                jsxContent += `
                    <Controller
                        name="${nameAttr}"
                        control={${controlName}}
                        render={({field, fieldState}) => (
                            <div className="form-group">
                                <label htmlFor="${nameAttr}">${element.label}</label>
                                <select id="${nameAttr}" {...field} className="form-control" ${requiredAttr}>
                                    ${optionsJsx}
                                </select>
                                {fieldState.error && (
                                    <p className="error-msg">{fieldState.error.message}</p>
                                )}
                            </div>
                        )}
                        ${rules}
                    />`;
                break;
            case 'radio':
                if (!isRadioRendered) {
                    isRadioRendered = true;
                    const radioGroups: Record<string, FormElement[]> = elements
                        .filter(el => el.type === 'radio')
                        .reduce((acc, current) => {
                            if (acc[current.name]) {
                                acc[element.name].push(current);
                                
                            } else {
                                acc[current.name] = [current];
                            }
                            return acc;
                    }, {} as {[key: string]: FormElement[]});

                    const radioElArr = Object.values(radioGroups);

                    radioElArr.sort((a: any, b: any) => {
                        const nameA = a[0].name; 
                        const nameB = b[0].name;

                        return nameA.localeCompare(nameB);
                    })
                    
                    radioElArr.forEach(el => {
                        jsxContent += `<div className="radio-group"><label>Radio group</label>`;
                  
                        el.forEach((element: FormElement | any) => {
                            jsxContent += ` 
                                <Controller
                                    name="${element.id}"
                                    control={${controlName}}
                                    render={({field, fieldState}) => (
                                        <div className="form-check form-check-inline">
                                            <input type="radio" id="${element.id}" name="${element.name}" value="${element.value}" ${requiredAttr} ${checkedAttr} className="form-check-input">
                                            <label for="${element.id}" className="form-check-label">${element.label}</label>
                                            {fieldState.error && (
                                                <p className="error-msg">{fieldState.error.message}</p>
                                            )}
                                        </div>
                                    )}
                                    ${rules}
                                />
                            `
                        });
                        jsxContent += `</div>`;
                    })
                }
            default:
                break;   
        }
    });

    return `
        import { useForm, Controller } from 'react-hook-form';

        function DynamicForm({ onSubmit }) {
            const {handleSubmit, ${controlName}, register, formState: {errors}} = useForm();
            
            return (
                <form id="dynamic-form" onSubmit={handleSubmit(onSubmit)} className="form-cnt">
                    ${jsxContent.trim()}
                    <div className="form-group submit-btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            );
        }
    `
}

export function generateSchemaHTML(syncData: SyncData) {
    if (!syncData.length) return null;

    let objSchema = '';

    syncData.forEach((field: any) => {
        const {id, type, value, options, required, validation: {regex, min, max, checked}} = field;

        let schema: string = 'z';

        switch (type) {
            case 'text':
            case 'textarea':
                schema += ".string('Value must be of type string.')";
                if (min) {
                    schema += `.min(${min}, 'Must have at least ${min} characters.')`
                }
                if (max) {
                    schema += `.max(${max}, 'Must have at most ${max} characters.')`;
                }
                if (regex && typeof regex === 'string') {
                    try {
                        const regexObject = new RegExp(regex);
                        schema += `.regex(${regexObject}, 'Invalid regex format.')`;
                    } catch (e) {
                        console.error(`Invalid Regex pattern in configuration: ${regex}`);
                    }
                }
                break;
            case 'number':
                schema = `z.coerce.number('The value must be a number.')`;
                if (min && typeof min === 'number') {
                    schema += `.min(${min}, 'Must be greater than or equal to ${min}.')`;
                }
                if (max && typeof max === 'number') {
                    schema += `.max(${max}, 'Must be less than or equal to ${max}.')`;
                }
                break;
            case 'date':
                schema += `.coerce.date('Invalid date format.')`;
                break;
            case 'email':
                schema += `.string().email('Invalid email format.')`;
                break;
            case 'radio':
            case 'checkbox':
                schema  += `.string()`;
                if (required) {
                    schema += `.min(1, 'This field is required.')`;
                }
                break;
            case 'select':
                schema += `.enum(options)`;   
        }

        if (!required) {
            schema += `.optional().nullable()`;
        }

        if (schema === 'z') return;
        objSchema += `${id}: ${schema}, `;
    });
    return `
        const FormSchema = z.object({
            ${objSchema}
        })
    `;
}