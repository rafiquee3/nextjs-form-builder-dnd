
'use client';


import { useEffect, useState } from "react";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { generateHTML, generateRHFComponents, generateSchemaHTML } from "../utils/generateHTML";
import { FormElement } from "../types/FormElement";
import Highlight from 'react-highlight'
import '../styles/atom-one-dark.css'
import { styleBttn } from "../styles/styles";

import * as prettier from "prettier/standalone"
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import parserHtml from 'prettier/parser-html';


interface ExportModalProps {
    onClose: () => void;
    elements: FormElement[];
}

export function ExportModal({onClose ,elements}: ExportModalProps) {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [syntax, setSyntax] = useState<string>('html');
    const syncData = useFormBuilderStore(store => store.syncData);

    const handleCopy = () => {
        if (!htmlContent) return;
        navigator.clipboard.writeText(htmlContent)
            .then(() => console.log('HTML copied to clipboard!'))
            .catch(err => console.error('Failed to copy text'));
    };

    const handleSave = () => {
        if (!htmlContent) return;
        const blob = new Blob([htmlContent], {type: 'text/html;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = 'generatedForm.html';

        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleHTML =  async () => {
        if (!elements.length) return;
        if (syntax !== 'html') {setSyntax('html')}
        const rawHTML = generateHTML(elements);

        const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "html", 
                                                            plugins: [parserHtml, prettierPluginEstree],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        });   
        setHtmlContent(formattedCode);
    };

    const handleRHF = async () => {
        if (!elements.length) return;
        if (syntax !== 'js') {setSyntax('js')}
        const rawHTML = generateRHFComponents(elements);

        const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "babel", 
                                                            plugins: [parserBabel, prettierPluginEstree],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        });   
        setHtmlContent(formattedCode);
    };

    const handleSchema = async () => {
        if (!syncData.length) return;
        if (syntax !== 'js') {setSyntax('js')}
        const rawHTML = generateSchemaHTML(syncData);
        const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "babel", 
                                                            plugins: [parserBabel, prettierPluginEstree],
                                                            trailingComma: "all",
                                                            singleQuote: false,
                                                            printWidth: 90,
                                                            tabWidth: 4,
                                                        });   
        setHtmlContent(formattedCode);
    };

    useEffect(() => {
        if (!elements.length) return;
        const rawHTML = generateHTML(elements);

        const getCode = async () => {
            const formattedCode = await prettier.format(rawHTML, {semi: false, 
                                                            parser: "html", 
                                                            plugins: [parserHtml, prettierPluginEstree],
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
        <div className="modal-cnt fixed inset-0 bg-black/0 flex justify-center items-center">
            <div className="modal-content w-[70%] h-[80%] bg-gray-600/50 rounded-xl flex flex-col">
                <div className="modal-header flex justify-center items-center relative h-12">
                    <h3>Export HTML Code</h3>
                    <button className={`absolute right-10 ${styleBttn} top-1/2 transform -translate-y-1/2`} onClick={onClose}>Close</button>
                </div>
                <div className="modal-code grow h-full overflow-y-auto bg-[#282C34] flex ">            
                    <Highlight className={`${syntax === 'js' ? 'js' : 'html'} w-fit m-auto`}>
                        {htmlContent}
                    </Highlight>
                </div>
                <div className="modal-nav h-12 flex justify-center items-center gap-10">
                    <button onClick={handleHTML}>
                        HTML
                    </button>
                    <button onClick={handleRHF}>
                        RHF
                    </button>
                    <button onClick={handleSchema}>
                        ZOD
                    </button>
                    <button onClick={handleCopy} disabled={htmlContent ? false : true}>
                        Copy to Clipboard
                    </button>
                    <button disabled={htmlContent ? false : true} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};