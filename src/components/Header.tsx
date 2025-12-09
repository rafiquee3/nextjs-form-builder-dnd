'use client';

import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { styleBttnHead } from "../styles/styles";
import { StatusFormMsg } from "./StatusFormMsg";

const showToast = (mssg: string, status: string) => {
    const store = useFormBuilderStore.getState();
    store.showToast(mssg, status);
}
export function Header() {
    const setToggleModal = useFormBuilderStore(store => store.setToggleModal);
    const showToast = useFormBuilderStore(store => store.showToast);
    const hideToast = useFormBuilderStore(store => store.hideToast);
    const formMsgStatus = useFormBuilderStore(store => store.formMsgStatus);
    console.log('header rerender')
    return (
        <div className="flex bg-white">
            <div className="w-full bg-gray-200 m-2 h-14 rounded-xl flex">
                <div className="flex items-center w-1/3 h-full text-black pl-10 gap-3">
                    <p>🌐</p>
                    <h2 className="text-xl">Form Generator</h2>
                </div>
                <div className="w-1/3 flex items-center justify-center text-black">
                    <div className="bg-white rounded-lg flex shadow-md">
                        <button className="bg-blue-200 py-2 px-6 rounded-lg shadow-md">Form</button>
                        <button className={styleBttnHead} onClick={() => setToggleModal()}>Export</button>
                        <button className={styleBttnHead}>Load</button>
                        <button className={styleBttnHead}>Save</button>
                    </div>
                </div>
                <div className="w-1/3"></div>
            </div>
            <StatusFormMsg msg={formMsgStatus.msg} status={formMsgStatus.status} isVisible={formMsgStatus.isVisible} onClose={hideToast} duration={formMsgStatus.duration}/>
        </div>
    );
}