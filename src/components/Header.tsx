'use client';

import { useFormBuilderStore } from "../store/useFormBuilderStore";
import { styleBttnHead } from "../styles/styles";

export function Header() {
    const setToggleModal = useFormBuilderStore(store => store.setToggleModal);

    return (
        <div className="flex bg-white">
            <div className="w-full bg-gray-200 m-2 h-14 rounded-xl flex">
                <div className="flex flex-col justify-center w-1/3 h-full text-black">
                    <h2 className="ml-10">Form Generator</h2>
                </div>
                <div className="w-1/3 flex items-center justify-center text-black ">
                    <div className="bg-white rounded-lg flex">
                        <button className="bg-blue-200 py-2 px-6 rounded-lg">Form</button>
                        <button className={styleBttnHead} onClick={() => setToggleModal()}>Export</button>
                        <button className={styleBttnHead}>Load</button>
                        <button className={styleBttnHead}>Save</button>
                    </div>
                </div>
                <div className="w-1/3"></div>
            </div>
        </div>
    );
}