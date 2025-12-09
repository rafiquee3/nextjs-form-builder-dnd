import { useEffect } from "react";

export function StatusFormMsg({msg, status, duration = 3000, isVisible, onClose}: {msg: string, status: string, duration: number, isVisible: boolean, onClose: () => void}) {
    const statusClasses = status === 'success' ? 'border-green-500 bg-green-200 tex-green-600' : 'border-red-500 bg-red-200 text-red-500';
    const transitionClasses = isVisible
        ? '-translate-x-5 opacity-100' 
        : 'translate-x-1/1 opacity-30';

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose])
    return (
        <div className={`border-l-8 fixed bottom-4 right-0 transform  max-w-fit w-full p-4 z-50 transition-all duration-500 ease-in-out ${transitionClasses} ${statusClasses} rounded-md shadow-lg`}>
            <p>{msg}</p>
        </div>
    )
}