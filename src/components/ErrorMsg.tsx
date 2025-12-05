export function ErrorMsg({errors}: {errors: string[]}) {
    if (!errors) return;

    return (
        <div className="bg-red-100">
            {errors.map((msg, i) => <p key={`err-key-${i}`}>* {msg}</p>)}
        </div>

    )
}