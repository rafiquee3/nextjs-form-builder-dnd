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
    <main className="grow flex w-full bg-white h-full">
      {isMounted &&
        <DndProvider backend={HTML5Backend}>
          <PalettePanel/>
          <FormBuilderArea/>
          <PropertiesPanel/>
        </DndProvider>
      }
    </main>
  );
}
