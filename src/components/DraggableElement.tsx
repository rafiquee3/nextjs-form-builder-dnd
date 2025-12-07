'use client';
import { useDrag } from "react-dnd";
import { DraggableElementProps } from "../types/props/props";
import { ItemTypes } from "./Palette";

export default function DraggableElement({elementProps, children}: DraggableElementProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.FORM_ELEMENT,
        item: { type: elementProps.type },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [elementProps.type]); 

    return (
        <li 
            ref={ drag as any} 
            className={``}
        >
            {children}
        </li>
    );
}
