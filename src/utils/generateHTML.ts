import { FormElement } from "../types/FormElement";

export function generateHTML(elements: FormElement[]): string {
    let htmlContent = '';
    let isRadioRendered = false;
    
    elements.forEach((element: FormElement) => {
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
                
                htmlContent += `
                    <div class="form-group">
                        <label for="${element.id}">${element.label}</label>
                        <${inputType} ${inputAttrs} id="${element.id}" name="${element.id}" ${requiredAttr} ${checkedAttr} class="form-control"${element.type === 'textarea' ? '></textarea>' : ' />'}
                    </div>`;
                break;

            case 'select':
                const optionsHtml = element.options?.map(opt =>
                    `<option value="${opt}">${opt}</option>`
                ).join('\n        ') || '';

                htmlContent += `
                    <div class="form-group">
                        <label for="${element.id}">${element.label}</label>
                        <select id="${element.id}" name="${element.id}" ${requiredAttr} class="form-control">
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
                    }, {})

                    const radioElArr = Object.values(radioGroups);

                    radioElArr.sort((a, b) => {
                        const nameA = a[0].name; 
                        const nameB = b[0].name;

                        return nameA.localeCompare(nameB);
                    })
                    
          

                    radioElArr.forEach(el => {
                        htmlContent += `<div><label>Radio group</label>`;
                        el.forEach(element => {
                            htmlContent += ` 
                                <div class="form-check form-check-inline">
                                    <input type="radio" id="${element.id}" name="${element.name}" value="${element.value}" ${requiredAttr} ${element.checked ? 'checked' : ''} class="form-check-input">
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

    elements.forEach((element: FormElement) => {
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
                const optionsJsx = element.options?.map(opt =>
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
                    }, {});

                    const radioElArr = Object.values(radioGroups);

                    radioElArr.sort((a, b) => {
                        const nameA = a[0].name; 
                        const nameB = b[0].name;

                        return nameA.localeCompare(nameB);
                    })
                    
                    radioElArr.forEach(el => {
                        jsxContent += `<div className="radio-group"><label>Radio group</label>`;
                  
                        el.forEach(element => {
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