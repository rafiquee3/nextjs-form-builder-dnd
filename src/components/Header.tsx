'use client';

import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { styleBttnHead } from "../styles/styles";
import { exportToJson } from "../utils/exportToJson";
import LoadJsonBttn from "./LoadBttn";
import { StatusFormMsg } from "./StatusFormMsg";

export function Header() {
    const setToggleModal = useFormBuilderStore(store => store.setToggleModal);
    const showToast = useFormBuilderStore(store => store.showToast);
    const hideToast = useFormBuilderStore(store => store.hideToast);
    const formMsgStatus = useFormBuilderStore(store => store.formMsgStatus);
    const elements = useFormBuilderStore(store => store.elements);
    const isEmptyForm = elements.length ? false : true;

    const handleSave = () => {
        if (isEmptyForm) return showToast('Empty form.', 'error');
        const jsonData = exportToJson(elements);
        const blob = new Blob([JSON.stringify(jsonData)], {
            type: "application/json",
        });
     
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = 'dataForm.json';

        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('Downloading file dataForm.json', 'success');
    };

    return (
        <div className="flex bg-white">
            <div className="w-full bg-gray-200 max-tablet: my-2 tablet:m-2 h-14 rounded-xl flex">
                <div className="flex items-center w-1/3 h-full text-black pl-10 gap-3">
                    <p className="max-tablet:hidden">🌐</p>
                    <h2 className="text-xl hidden areaM:block">Form Generator</h2>
                </div>
                <div className="w-1/3 flex items-center justify-center text-black">
                    <div className="bg-white rounded-lg flex shadow-md">
                        <button className="bg-blue-200 py-2 px-6 rounded-lg shadow-md">Form</button>
                        <button className={styleBttnHead} onClick={() => setToggleModal()}>Export</button>
                        <LoadJsonBttn />
                        <button className={styleBttnHead} onClick={handleSave}>Save</button>
                    </div>
                </div>
                <div className="w-1/3"></div>
            </div>
            <StatusFormMsg msg={formMsgStatus.msg} status={formMsgStatus.status} isVisible={formMsgStatus.isVisible} onClose={hideToast} duration={formMsgStatus.duration}/>
        </div>
    );
}