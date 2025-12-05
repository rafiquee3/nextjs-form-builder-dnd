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
            case 'textarea':
                const inputType = element.type === 'textarea' ? 'textarea' : 'input';
                const inputAttrs = element.type !== 'textarea' ? `type="${element.type}"` : '';
                
                htmlContent += `
                    <div class="form-group">
                        <label for="${element.id}">${element.label}</label>
                        <${inputType} ${inputAttrs} id="${element.id}" name="${element.id}" ${requiredAttr} class="form-control"${element.type === 'textarea' ? '></textarea>' : ' />'}
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

                    const groupedObject = elements.filter(el=> el.type === 'radio').reduce((acc, current) => {
                       if (acc[current.name]) {
                        acc[current.name].push(current)
                       } else {
                        acc[current.name] = [current];
                       }
                       return acc;
                    }, {})

                    const radioElArr = Object.values(groupedObject);
                    console.log('zzz', radioElArr)
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
                                    <input type="radio" id="${element.id}" name="${element.name}" value="${element.value}" ${requiredAttr} class="form-check-input">
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
        <form id="dynamic-form">
            ${htmlContent.trim()}
            <div class="form-group submit-btn">
                <button type="submit">Submit Form</button>
            </div>
        </form>`;
}