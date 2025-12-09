import { useFormBuilderStore } from "../store/useFormBuilderStore";
import DraggableElement from "./DraggableElement";
import { BaseElement } from "../types/FormElement";

export default function PalettePanelMobile() {
    const addElement = useFormBuilderStore(store => store.addElement);
    const DUMMY_PROPS = {
        id: Date.now().toString(),
        isPaletteItem: true, 
        required: false, 
        placeholder: "", 
        validation: {
            placeholder: '',
            min: undefined,
            max: undefined,
            regex: undefined,
            required: undefined,
            checked: undefined,
            name: '',
        }
    };
    const handleClick = (type: BaseElement['type']) => {
        addElement(type);
    }
    return (
        <div className="hidden max-tablet:block w-full bg-gray-200  mt-0 rounded-xl text-white flex-shrink-0">
            <h2 className="p-3 bg-white border-1 border-gray-200 rounded-t-xl text-black">Palette Panel</h2>
            <aside>
                <ul className="text-lg">
                    <DraggableElement elementProps={{
                        type: "text"
                    }}>
                        <button className="bg-blue-300 w-full py-3 text-left pl-6" onClick={() => handleClick('text')}>
                            + Text Input
                        </button>
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "textarea"
                    }}>
                        <button className="bg-violet-300 w-full py-3 text-left pl-6" onClick={() => handleClick('textarea')}>
                            + Textarea
                        </button>
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "select"
                    }}>
                        <button className="bg-orange-300 w-full py-3 text-left pl-6" onClick={() => handleClick('select')}>
                            + Select
                        </button>
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "checkbox"
                    }}>
                         <button className="bg-red-300 w-full py-3 text-left pl-6" onClick={() => handleClick('checkbox')}>
                            + Checkbox
                        </button>
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "radio"
                    }}>
                        <button className="bg-gray-400 w-full py-3 text-left pl-6" onClick={() => handleClick('radio')}>
                            + Radio
                        </button>
                    </DraggableElement>
                </ul>
            </aside>
        </div>
    )
}