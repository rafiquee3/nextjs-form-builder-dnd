import CheckobxInput from "./FormElements/CheckboxInput";
import RadioInput from "./FormElements/RadioInput";
import SelectInput from "./FormElements/SelectInput";
import TextareaInput from "./FormElements/TextareaInput";
import TextInput from "./FormElements/TextInput";

export default function PalettePanel() {
    const options = {};
    return (
        <div className="h-[500px] w-[300px] bg-gray-200">
            <h2 className="text-black">Palette Panel</h2>
            <aside>
                <ul>
                    <li>
                        <TextInput 
                            isPaletteItem={true} 
                            type="text" 
                            label="Text Input" 
                            id="dummy-text" 
                            required={false} 
                            placeholder="Example" 
                            validation={options}
                        />
                    </li>
                    <li>
                        <TextareaInput 
                            isPaletteItem={true} 
                            id="dummy-textarea" 
                            type="text" 
                            required={false} 
                            label="Textarea Input" 
                            placeholder="Example" 
                            validation={options}
                        />
                    </li>
                    <li>
                        <SelectInput 
                            isPaletteItem={true} 
                            id="dummy-select" 
                            type="select" 
                            required={false} 
                            label="Select Input" 
                            placeholder="Example" 
                            validation={options} 
                            options={[]}
                        />
                    </li>
                    <li>
                        <CheckobxInput 
                            isPaletteItem={true} 
                            id="dummy-checkbox" 
                            type="checkbox" 
                            required={false} 
                            label="Checkbox Input" 
                            placeholder="Example" 
                            validation={options} 
                            defaultChecked={false}
                        />
                    </li>
                    <li>
                        <RadioInput 
                            isPaletteItem={true} 
                            id="dummy-radio" 
                            type="radio" 
                            required={false} 
                            label="Radio Input" 
                            placeholder="Example" 
                            validation={options} 
                            defaultChecked={false}
                        />
                    </li>
                </ul>
            </aside>
        </div>
    )
}