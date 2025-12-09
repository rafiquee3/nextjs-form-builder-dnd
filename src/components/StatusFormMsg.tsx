import { useEffect } from "react";

export function StatusFormMsg({msg, status, duration = 3000, isVisible, onClose}: {msg: string, status: string, duration: number, isVisible: boolean, onClose: () => void}) {
    const statusClasses = status === 'success' ? 'border-green-500 bg-green-200 text-green-600' : 'border-red-500 bg-red-200 text-red-500';
    const transitionClasses = isVisible
        ? 'tablet:-translate-x-5 max-tablet:-translate-y-1 opacity-100' 
        : 'tablet:translate-x-1/1 max-tablet:-translate-y-20 opacity-50';

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose])
    return (
        <div className={`border-l-8 fixed tablet:bottom-4 max-tablet:top-0 right-0 max-tablet:left-0 transf tablet:max-w-fit  p-4 z-50 transition-all duration-500 ease-in-out ${transitionClasses} ${statusClasses} tablet:rounded-md shadow-lg`}>
            <p>{msg}</p>
        </div>
    )
}