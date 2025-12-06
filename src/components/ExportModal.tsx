
'use client';

import { useEffect, useState } from "react";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { generateHTML, generateRHFComponents, generateSchemaHTML } from "../utils/generateHTML";
import { FormElement } from "../types/FormElement";
import Highlight from 'react-highlight'
import '../styles/atom-one-dark.css'

interface ExportModalProps {
    onClose: () => void;
    elements: FormElement[];
}

export function ExportModal({onClose ,elements}: ExportModalProps) {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
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

    const handleHTML = () => {
        if (!elements.length) return;
        const htmlContent = generateHTML(elements);
        setHtmlContent(htmlContent);
    };

    const handleRHF = () => {
        if (!elements.length) return;
        const htmlContent = generateRHFComponents(elements, 'control');
        setHtmlContent(htmlContent);
    };

    const handleSchema = () => {
        if (!syncData.length) return;
        const htmlContent = generateSchemaHTML(syncData);
        setHtmlContent(htmlContent);
    };

    useEffect(() => {
        if (!elements.length) return;
        const htmlContent = generateHTML(elements);
        setHtmlContent(htmlContent);
    } , [])
    
    return (
        <div className="modal-cnt fixed inset-0 bg-black/0 flex justify-center items-center">
            <div className="modal-content w-[70%] h-[80%] bg-gray-600/50 rounded-xl flex flex-col">
                <div className="modal-header">
                    <h3>Export HTML Code</h3>
                    <button onClick={onClose}>Close</button>
                </div>
                <div className="modal-code grow h-full overflow-y-auto">            
                    <Highlight className='html'>
                      {htmlContent}
                    </Highlight>
                </div>
                <div className="modal-nav">
                    <button onClick={handleHTML}>
                        HTML Form
                    </button>
                    <button onClick={handleRHF}>
                        RHF Form
                    </button>
                    <button onClick={handleSchema}>
                        RHF Form
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