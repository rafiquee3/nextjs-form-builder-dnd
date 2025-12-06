
interface ExportModalProps {
    htmlContent: string;
    onClose: () => void;
}

export function ExportModal({htmlContent, onClose}: ExportModalProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(htmlContent)
            .then(() => console.log('HTML copied to clipboard!'))
            .catch(err => console.error('Failed to copy text'));
    };

    const handleSave = () => {
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

    return (
        <div className="modal-cnt fixed inset-0 bg-black/0 flex justify-center items-center">
            <div className="modal-content w-[70%] h-[80%] bg-gray-600/50 rounded-xl flex flex-column">
                <div className="modal-header">
                    <h3>Export HTML Code</h3>
                    <button onClick={onClose}>Close</button>
                </div>
                <pre className="modal-code">
                    <code>{htmlContent}</code>
                </pre>
                <div className="modal-nav">
                    <button onClick={handleCopy}>
                        Copy to Clipboard
                    </button>
                    <button onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};