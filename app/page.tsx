import FormBuilderArea from "@/src/components/FormBuilderArea";
import PalettePanel from "@/src/components/PalettePanel";
import PropertiesPanel from "@/src/components/PropertiesPanel";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full gap-10 items-center justify-center py-32 px-16 bg-white">
          <PalettePanel/>
          <FormBuilderArea/>
          <PropertiesPanel/>
      </main>
    </div>
  );
}
