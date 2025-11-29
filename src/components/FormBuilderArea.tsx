'use client';

import { useDrop } from "react-dnd";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import ElementRenderer from "./ElementRenderer";
import { ItemTypes } from "./Palette";
import { DropItem } from "../types/FormElement";
import { useForm, FormProvider } from 'react-hook-form';

export default function FormBuilderArea() {
    const formElements = useFormBuilderStore((store) => store.elements);
    const addElement = useFormBuilderStore(store => store.addElement);
    const methods = useForm();
    const {handleSubmit} = methods;

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.FORM_ELEMENT,
        drop: (item: DropItem, monitor) => {
            if (monitor.didDrop()) return;
            addElement(item.type);
        },

        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [addElement]);

    const onSubmit = (data:any) => {
        console.log('submit', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div ref ={drop as any} className={`h-[500px] w-[300px] bg-gray-200 text-black ${isOver ? 'bg-green-200 text-black' : ''}`}>
                <FormProvider {...methods}>
                    {formElements.map(el => (<ElementRenderer key={el.id} element={el}/>))}
                </FormProvider>
            </div>
        </form>
    )
}