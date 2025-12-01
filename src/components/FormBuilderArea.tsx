'use client';

import { useDrop } from "react-dnd";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import ElementRenderer from "./ElementRenderer";
import { ItemTypes } from "./Palette";
import { DropItem } from "../types/FormElement";
import { useForm, FormProvider } from 'react-hook-form';
import { getRHFDefaultValues } from "../utils/getRHFDefaultValues";
import { useMemo } from "react";

export default function FormBuilderArea() {
    const formElements = useFormBuilderStore((store) => store.elements);
    const addElement = useFormBuilderStore(store => store.addElement);
    const defaultValues = useMemo(() => getRHFDefaultValues(formElements), [formElements]);
    
    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        //resolver: zodResolver(), 
        defaultValues: defaultValues,
    });

    const {handleSubmit, reset, unregister} = methods;

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
    console.log('elements', formElements)
    return (
        <div ref ={drop as any} className={`h-[500px] w-[300px] bg-gray-200 text-black ${isOver ? 'bg-green-200 text-black' : ''}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <FormProvider {...methods}>
                        {formElements.map(el => (<ElementRenderer key={el.id} element={el} unregister={unregister}/>))}
                    </FormProvider>
            </form>
         </div>
    )
}