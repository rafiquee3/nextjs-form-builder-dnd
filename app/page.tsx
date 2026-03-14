'use client';

import { useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dynamic from 'next/dynamic';

const PalettePanel = dynamic(
  () => import('@/src/components/PalettePanel'),
  { ssr: false }
);
const PalettePanelMobile = dynamic(
  () => import('@/src/components/PalettePanelMobile'),
  { ssr: false }
);
const PropertiesPanel = dynamic(
  () => import('@/src/components/PropertiesPanel'),
  { ssr: false }
);
const FormBuilderArea = dynamic(
  () => import('@/src/components/FormBuilderArea'),
  { ssr: false }
);

export default function BuilderPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="grow flex max-tablet:flex-col max-tablet:gap-2 w-full bg-white h-full">
      {isMounted && (
        <DndProvider backend={HTML5Backend}>
          <PalettePanelMobile />
          <PalettePanel />
          <FormBuilderArea />
          <PropertiesPanel />
        </DndProvider>
      )}
    </main>
  );
}
