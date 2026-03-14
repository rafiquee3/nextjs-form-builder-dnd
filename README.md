# Next.js Drag & Drop Form Builder (e-form-gen)

A robust, interactive drag-and-drop form builder and generator built with Next.js and React. This project provides a powerful visual interface to design, configure, and export custom form schemas without writing any code.

## Live Demo

You can try the builder live at: [https://nextjs-form-builder-dnd.vercel.app](https://nextjs-form-builder-dnd.vercel.app)

## Features

- **Drag and Drop Interface**: Easily construct your forms by dragging elements from the palette directly into the building area. Reorder components seamlessly.
- **Dynamic Element Configuration**: Customize properties for each form element, including labels, placeholders, default values, required status, and advanced validation rules.
- **Real-Time State Management**: Built with Zustand for highly efficient and predictable state handling across panels without unnecessary re-renders.
- **Advanced Form Processing**: Integrated with React Hook Form and Zod to provide robust schema-based validation for your built forms.
- **Import/Export Capabilities**: Export the entire form schema as a structured JSON object or load an existing schema to continue editing where you left off.
- **Code Visualization**: Integrated syntax highlighting to preview generated JSON schemas or code snippets directly within the application.
- **Responsive Design**: Includes dedicated mobile and desktop palette experiences for building forms on any device.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS 4, PostCSS
- **State Management**: Zustand
- **Drag & Drop**: React DnD
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Syntax Highlighting**: React Highlight
- **Language**: TypeScript

## Getting Started

### Prerequisites

Ensure you have Node.js (version 20 or higher recommended) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-form-gen
   ```

2. Install dependencies via npm:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the form builder interface.

## Project Structure

- `src/components`: Contains the building blocks of the UI.
  - `PalettePanel` / `PalettePanelMobile`: Sidebar containing draggable form widgets.
  - `FormBuilderArea`: The main canvas where elements are dropped and arranged.
  - `PropertiesPanel`: Contextual sidebar to configure the currently selected widget.
  - `ExportModal`: Dialog for viewing and copying the generated JSON schema.
- `src/store`: Zustand stores handling the drag-and-drop mechanics, widget configuration, and overall application state.
- `src/utils` & `src/types`: TypeScript types, validation schemas, and helper functions used throughout the application.

## Usage

1. **Select Components**: Start by dragging text inputs, text areas, checkboxes, or specialized form inputs from the left Palette Panel.
2. **Build the Form**: Drop the elements into the center Form Builder Area. You can freely drag them around to reorder the layout.
3. **Configure Properties**: Click on any element in the builder area to open the Properties Panel on the right. Modify names, placeholders, label text, and validation constraints such as minimum/maximum lengths or required flags.
4. **Export Schema**: Once your custom form design is complete, use the export option to generate a JSON payload of your form configuration. You can use this schema in any frontend application dynamically handling forms.

## License

This project is open-source and available under the terms of the MIT License.
