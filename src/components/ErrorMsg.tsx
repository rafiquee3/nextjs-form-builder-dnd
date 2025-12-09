export function ErrorMsg({errors}: {errors: string[]}) {
    if (!errors) return;

    return (
        <div className={`text-red-600 ${errors.length ? 'p-2 pb-0 text-sm' : ''}`}>
            {errors.map((msg, i) => <p key={`err-key-${i}`}>* {msg}</p>)}
        </div>

    )
}