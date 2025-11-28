'use client';

import { useFormBuilderStore } from "../store/useFormBuilderStore";
import ElementRenderer from "./ElementRenderer";

export default function FormBuilderArea() {
    const formElements = useFormBuilderStore((store) => store.elements);

    return (
        <div>
            {formElements.map(el => (<ElementRenderer key={el.id} element={el}/>))}
        </div>
    )
}