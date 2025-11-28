'use client';
import { useDrag } from "react-dnd";
import { DraggableElementProps } from "../types/props/props";
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from "./Palette";
import { useEffect } from "react";

export default function DraggableElement({elementProps, children}: DraggableElementProps) {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.FORM_ELEMENT,
        item: { type: elementProps.type },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [elementProps.type]); 
    useEffect(() => {
        if (preview) {
            preview(getEmptyImage(), { captureDraggingState: true });
        }
    }, [preview]);
    console.log('isDrag', isDragging)
    return (
        <li 
            ref={ drag as any} 
            className="cursor-grab p-2 border-b border-gray-300 transition duration-150 ease-in-out hover:bg-gray-300"
            style={{ 
                visibility: isDragging ? "hidden" : "visible",
                opacity: isDragging ? 0 : 0.9,
                backgroundColor: isDragging ? 'red' : 'yellow' 
            }}
        >
            {children}
        </li>
    );
}
