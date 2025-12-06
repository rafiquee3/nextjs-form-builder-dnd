'use client';

import { useDrop } from "react-dnd";
import { useFormBuilderStore } from "../store/useFormBuilderStore";
import ElementRenderer from "./ElementRenderer";
import { ItemTypes } from "./Palette";
import { DropItem, SyncData, ValError } from "../types/FormElement";
import { useForm, FormProvider } from 'react-hook-form';
import { getRHFDefaultValues } from "../utils/getRHFDefaultValues";
import { useMemo, useState } from "react";
import { getSyncData } from "../utils/getSyncData";
import { schemaGenerator } from "../utils/schemaGenerator";
import { generateHTML, generateRHFComponents, generateSchemaHTML } from "../utils/generateHTML";
import { ExportModal } from "./ExportModal";

export default function FormBuilderArea() {
    const formElements = useFormBuilderStore((store) => store.elements);
    const addElement = useFormBuilderStore(store => store.addElement);
    const setErrors = useFormBuilderStore(store => store.setValErrors);
    const defaultValues = useMemo(() => getRHFDefaultValues(formElements), [formElements]);
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    
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
        if (!formElements.length) return;
        console.log('data', data)
        const syncData: SyncData = getSyncData(data, formElements);
        console.log('syncData', syncData)
        const schemasArr = schemaGenerator(syncData);
        const errors: ValError[] = [];

        schemasArr.forEach(data => {
            let {value, schema, id, type} = data;
            
            if (type === 'number') {
                //value = Number(value); 
            }
            console.log('val', value, 'type', typeof value)
            const validation = schema.safeParse(value);
            if (!validation.success) {
                const msg = validation.error?.flatten().formErrors;
                errors.push({fieldId: id, msg});
            } 
        });
  
        if (errors.length) {
            setErrors(errors);
            return;
        }
        setErrors([]);
        console.log('success')
       console.log('genHTML', generateHTML(formElements));
       //console.log('genHTML', generateRHFComponents(formElements, 'control'));
        //console.log('genHTML', generateSchemaHTML(syncData));
   
    };
    console.log('element', formElements)
    return (
        <div ref ={drop as any} className={`h-[500px] w-[300px] bg-gray-200 text-black ${isOver ? 'bg-green-200 text-black' : ''}`}>
            {toggleModal && <ExportModal htmlContent={""} onClose={() => setToggleModal(prev => !prev)}/>}
            <div>
                <button onClick={() => {setToggleModal(true)}}>Export</button>
                <button onClick={() => {}}>Export HTML</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <FormProvider {...methods}>
                        {formElements.map(el => (<ElementRenderer key={el.id} element={el} unregister={unregister}/>))}
                    </FormProvider>
                    <button type='submit'>Submit</button>
            </form>
         </div>
    )
}