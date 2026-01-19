# MsgStudio

A web-based message composition tool that helps users write better, more structured WhatsApp messages.

## Features

- **Template-based composition** - Multiple pre-designed message templates to choose from
- **Bilingual support** - English and Arabic language toggle (right-to-left support)
- **Rich form builder** - Dynamic form fields with emoji picker integration
- **Real-time preview** - View formatted messages as you compose them
- **Customization options** - Toggle borders and emojis in message formatting
- **Professional UI** - Clean, modern interface built with React, TypeScript, and Tailwind CSS

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool with HMR
- **Tailwind CSS** - Styling
- **shadcn/ui** - Accessible component library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── emoji-picker.tsx
│   ├── form-composer.tsx
│   ├── language-toggle.tsx
│   ├── message-preview.tsx
│   └── template-selector.tsx
├── lib/                 # Utility functions
│   ├── format-message.ts
│   ├── translations.ts
│   └── utils.ts
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## License

MIT
