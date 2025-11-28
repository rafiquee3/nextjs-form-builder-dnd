'use client';
import FormBuilderArea from "@/src/components/FormBuilderArea";
import PalettePanel from "@/src/components/PalettePanel";
import PropertiesPanel from "@/src/components/PropertiesPanel";
import { useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function BuilderPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
        setIsMounted(true);
    }, []);
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full gap-10 items-center justify-center py-32 px-16 bg-white">
        {isMounted &&
        <DndProvider backend={HTML5Backend}>
          <PalettePanel/>
          <FormBuilderArea/>
          <PropertiesPanel/>
        </DndProvider>
        }
      </main>
    </div>
  );
}
