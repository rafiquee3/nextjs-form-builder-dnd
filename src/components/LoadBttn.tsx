import { useRef } from "react";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { styleBttnHead } from "../styles/styles";
import { FormElement } from "../types/FormElement";

export default function LoadJsonBttn() {
    const inputRef = useRef<HTMLInputElement>(null);
    const showToast = useFormBuilderStore(store => store.showToast);
    const setElements = useFormBuilderStore(store => store.setElements);
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const fileContent = e.target?.result;
               
                if (typeof fileContent === 'string') {
                    try {
                        const loadedData = JSON.parse(fileContent);
                        const elements: FormElement[] = [];
                        Object.keys(loadedData).forEach((element: any, i) => elements.push(loadedData[i]));
                        setElements(elements);
                        showToast('File loaded.', 'success');
                    } catch {
                        showToast('Load failed.', 'error');
                    }
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';   
    }

    return (
        <>
            <input
                type="file"
                id="jsonpicker"
                accept=".json"
                onChange={handleLoad} 
                ref={inputRef}
                hidden
            />
            <button onClick={handleClick} className={styleBttnHead}>
                Load
            </button>
        </>
    );
}