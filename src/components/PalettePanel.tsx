import DraggableElement from "./DraggableElement";
import CheckobxInput from "./FormElements/CheckboxInput";
import RadioInput from "./FormElements/RadioInput";
import SelectInput from "./FormElements/SelectInput";
import TextareaInput from "./FormElements/TextareaInput";
import TextInput from "./FormElements/TextInput";

export default function PalettePanel() {
    const DUMMY_PROPS = {
        id: Date.now().toString(),
        isPaletteItem: true, 
        required: false, 
        placeholder: "Example", 
        validation: {}
    };
    return (
        <div className="h-[500px] w-[300px] bg-gray-200">
            <h2 className="text-black">Palette Panel</h2>
            <aside>
                <ul>
                    <DraggableElement elementProps={{
                        type: "text"
                    }}>
                        <TextInput 
                            type="text" 
                            label="Text Input" 
                            {...DUMMY_PROPS}
                        />
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "textarea"
                    }}>
                        <TextareaInput 
                            type="textarea" 
                            label="Textarea Input" 
                            {...DUMMY_PROPS}
                        />
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "select"
                    }}>
                        <SelectInput 
                            type="select" 
                            label="Select Input" 
                            {...DUMMY_PROPS}   
                            options={[]}
                            value=''
                        />
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "checkbox"
                    }}>
                        <CheckobxInput 
                            type="checkbox" 
                            label="Checkbox Input"
                            checked={false}
                            {...DUMMY_PROPS}  
                        />
                    </DraggableElement>
                    <DraggableElement elementProps={{
                        type: "radio"
                    }}>
                        <RadioInput 
                            type="radio" 
                            label="Radio Input" 
                            checked={false}
                            {...DUMMY_PROPS}  
                        />
                    </DraggableElement>
                </ul>
            </aside>
        </div>
    )
}