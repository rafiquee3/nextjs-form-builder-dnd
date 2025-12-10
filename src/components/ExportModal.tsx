'use client';

import { useEffect, useState } from "react";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { generateHTML, generateRHFComponents, generateSchemaHTML } from "../utils/generateHTML";
import { FormElement } from "../types/FormElement";
import Highlight from 'react-highlight'
import '../styles/atom-one-dark.css'
import { menuActive, menuDefault, styleBttn } from "../styles/styles";
import * as prettier from "prettier/standalone"
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import parserHtml from 'prettier/parser-html';

interface ExportModalProps {
    elements: FormElement[];
}

export function ExportModal({elements}: ExportModalProps) {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [syntax, setSyntax] = useState<string>('html');
    const syncData = useFormBuilderStore(store => store.syncData);
    const [aciveBttn, setActiveBttn] = useState('html');
    const setToggleModal = useFormBuilderStore(store => store.setToggleModal);
    const showToast = useFormBuilderStore(store => store.showToast);
    const isContentEmpty = elements.length ? false : true;

    const handleCopy = () => {
        if (isContentEmpty) return showToast('No content.', 'error');
        if (htmlContent.startsWith('Form submission')) return showToast('Submit the form.', 'error');
        navigator.clipboard.writeText(htmlContent)
            .then(() => showToast('Copied to clipboard', 'success'))
            .catch(err => showToast('Submit the form.', 'error'));
    };

    const handleSave = () => {
        if (isContentEmpty) return showToast('Downloading filed.', 'error');
        if (htmlContent.startsWith('Form submission')) return showToast('Submit the form.', 'error');
        const blob = new Blob([htmlContent], {type: 'text/html;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = 'generatedForm.html';

        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('Downloading file generatedForm.html', 'success');
    };

    const handleHTML =  async () => {
        if(aciveBttn !== 'html') setActiveBttn('html');
        if (!elements.length) return setHtmlContent('Add fields to the form.');
        if (syntax !== 'html') {setSyntax('html')}
        const rawHTML = generateHTML(elements);

        const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "html", 
                                                            plugins: [parserHtml, prettierPluginEstree as any],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        });   
        setHtmlContent(formattedCode);
    };

    const handleRHF = async () => {
        if(aciveBttn !== 'rhf') setActiveBttn('rhf');
        if (!elements.length) return setHtmlContent('Add fields to the form.');
        if (syntax !== 'ts') {setSyntax('ts')}
        const rawHTML = generateRHFComponents(elements);
        console.log('raw', rawHTML)
        const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "babel", 
                                                            plugins: [parserBabel, prettierPluginEstree as any],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        });   
        setHtmlContent(formattedCode);
    };

    const handleSchema = async () => {
        if(aciveBttn !== 'zod') setActiveBttn('zod');
        if (!syncData.length) return setHtmlContent('Form submission is required.');
        if (syntax !== 'ts') {setSyntax('ts')}
        const rawHTML = generateSchemaHTML(syncData);
        const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "babel", 
                                                            plugins: [parserBabel, prettierPluginEstree as any],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        });   
        setHtmlContent(formattedCode);
    };

    useEffect(() => {
        if (!elements.length) return setHtmlContent('Add fields to the form.');
        const rawHTML = generateHTML(elements);

        const getCode = async () => {
            const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "html", 
                                                            plugins: [parserHtml, prettierPluginEstree as any],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        }); 
            setHtmlContent(formattedCode);
        }
        getCode();
    } , []);
    
    return (
        <div className="max-tablet:min-w-[370px] modal-cnt fixed inset-0 bg-black/0 flex justify-center tablet:items-center z-50 max-tablet:w-full">
            <div className="modal-content max-tablet:w-full tablet:w-[70%] tablet:h-[80%] bg-gray-300 tablet:rounded-xl flex flex-col shadow-xl relative z-2">
                <div className="modal-header flex w-full items-center justify-between h-12">
                    <div className="w-1/3"></div> 
                    <div className="flex justify-center w-1/3">
                        <h3 className="hidden tablet:block self-center">Export HTML Code</h3>
                        <h3 className="hidden max-tablet:block self-center">Export</h3>
                    </div>
                    <div className="flex justify-end w-1/3">
                        <button className={`${styleBttn} mr-5`} onClick={() => setToggleModal()}>Close</button>
                    </div>
                </div>
                <div className="modal-code grow h-full overflow-y-auto bg-[#282C34] flex p-2 relative">            
                    <Highlight className={`${syntax === 'ts' ? 'typescript' : 'html'}`}>
                        {htmlContent}
                    </Highlight>
                </div>
                <div className="modal-nav h-12 flex justify-center items-center">
                    <div className="max-tablet:hidden w-1/3"></div> 
                    <div className="flex max-tablet:item-start justify-center gap-6 w-1/3 max-tablet:w-2/3 font-medium">
                        <button className={aciveBttn === 'html' ? menuActive : menuDefault} onClick={handleHTML}>
                            HTML
                        </button>
                        <button className={aciveBttn === 'rhf' ? menuActive : menuDefault} onClick={handleRHF}>
                            RHF
                        </button>
                        <button className={aciveBttn === 'zod' ? menuActive : menuDefault} onClick={handleSchema}>
                            ZOD
                        </button>
                    </div>
                    <div className="flex justify-end gap-2 w-1/3">
                        <button className={`${styleBttn}`} onClick={handleCopy}>
                            Copy
                        </button>
                        <button className={`${styleBttn} mr-5`} disabled={htmlContent ? false : true} onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};