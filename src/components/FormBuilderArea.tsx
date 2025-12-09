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
import { ExportModal } from "./ExportModal";
import { styleBttn, styleBttnHead } from "../styles/styles";
import { StatusFormMsg } from "./StatusFormMsg";

export default function FormBuilderArea() {
    const formElements = useFormBuilderStore((store) => store.elements);
    const addElement = useFormBuilderStore(store => store.addElement);
    const setErrors = useFormBuilderStore(store => store.setValErrors);
    const setSyncData = useFormBuilderStore(store => store.setSyncData);
    const defaultValues = useMemo(() => getRHFDefaultValues(formElements), [formElements]);
    const toggleModal = useFormBuilderStore(store => store.toggleModal);

    const [statusFormMsg, setStatusFormMsg] = useState({ 
        isVisible: false, 
        msg: '', 
        status: 'success', 
        duration: 3000 
    });

    const showStatusMsg = (msg: string, status: string, duration = 3000) => {
        setStatusFormMsg({ isVisible: true, msg, status, duration });
    };
    
    const hideToast = () => {
        setStatusFormMsg(prev => ({ ...prev, isVisible: false }));
    };
    
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
        setSyncData(data);
        const syncData = getSyncData(data, formElements);
        const schemasArr = schemaGenerator(syncData);
        const errors: ValError[] = [];

        schemasArr.forEach(data => {
            let {value, schema, id} = data;
            
            const validation = schema.safeParse(value);
            if (!validation.success) {
                const msg = validation.error?.flatten().formErrors;
                errors.push({fieldId: id, msg});
            } 
        });
  
        if (errors.length) {
            showStatusMsg('The form failed validation.', 'error');
            setErrors(errors);
            return;
        }
        showStatusMsg('The form passed validation successfully.', 'success');
        setErrors([]);
    };
  
    return (
        <div ref ={drop as any} className={`grow bg-gray-200 h-[calc(100vh-80px)] overflow-hidden] text-black ${isOver ? 'inset-border-blue' : ''}  rounded-xl mb-2 shadow-sm`}>
            {toggleModal && 
            <ExportModal elements={formElements}/>
            }
            <StatusFormMsg msg={statusFormMsg.msg} status={statusFormMsg.status} isVisible={statusFormMsg.isVisible} onClose={hideToast} duration={statusFormMsg.duration}/>
            <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-30 h-full overflow-y-scroll flex flex-col">
                    <FormProvider {...methods}>
                        {formElements.map(el => (<ElementRenderer key={el.id} element={el} unregister={unregister}/>))}
                    </FormProvider>
                    {formElements.length ? 
                        <button className={`${styleBttn} bg-white border-1 border-black py-3`} type='submit'>Submit</button>
                    
                        :
                        
                        <div>
                            <p className="text-center">Drag the element from the PalettePanel and drop it onto the workspace.</p>
                        </div>
                    }
            </form>
         </div>
    )
}