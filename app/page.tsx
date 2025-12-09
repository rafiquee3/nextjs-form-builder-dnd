'use client';
import FormBuilderArea from "@/src/components/FormBuilderArea";
import PalettePanel from "@/src/components/PalettePanel";
import PalettePanelMobile from "@/src/components/PalettePanelMobile";
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
    <main className="grow flex max-tablet:flex-col max-tablet:gap-2 w-full bg-white h-full">
      {isMounted &&
        <DndProvider backend={HTML5Backend}>
          <PalettePanelMobile/>
          <PalettePanel/>
          <FormBuilderArea/>
          <PropertiesPanel/>
        </DndProvider>
      }
    </main>
  );
}
