'use client';
import { useState } from "react"

export default function PropertiesPanel() {
    const [currentElement, setCurrentElement] = useState(null);

    return (
        <div className="h-[500px] w-[300px] bg-gray-200 text-black">
            <aside>
                <h2 className="">Properties Panel</h2>
                {currentElement ?
                    <form>
                        <div>
                            <label>Field Label</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Placeholder Text</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Required Field</label>
                            <input></input>
                        </div>
                    </form>
                    :
                    <p>Click on the element you want to edit</p>
                }
            </aside>
        </div>
    )
}