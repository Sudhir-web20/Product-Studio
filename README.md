# Product Studio

Product Studio is a sleek, minimal AI-powered web application designed for high-end product photography. It allows users to transform simple product shots into professional studio or lifestyle images with perfectly preserved product details.

## 🚀 Key Features

- **Studio Mode**: Replace backgrounds with professional styles like Marble, Dark, or Classic White Studio.
- **Lifestyle + Avatar Mode**: Generate realistic human avatars (Male/Female) naturally interacting with your product in various environments.
- **Scene Selector**: Place products and avatars in immersive scenes:
  - Professional Studio
  - Modern Gym
  - Urban Cityscape
  - Outdoor Nature
  - Home Lifestyle
- **Aspect Ratio Control**: Support for 1:1, 16:9, and 4:3 formats to fit various social media and e-commerce needs.
- **High-Fidelity Rendering**: Leverages advanced AI to ensure lighting, shadows, and textures are consistent and premium.

## 🛠️ Tech Stack

- **Frontend**: React (v19)
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini API (`gemini-2.5-flash-image`)
- **Typography**: Inter (Google Fonts)

## 📦 Getting Started

### Prerequisites

- An API Key for the Google Gemini API.

### Environment Setup

The application expects the API key to be provided via the `API_KEY` environment variable.

### Project Structure

- `index.tsx`: Application entry point.
- `App.tsx`: Main application layout and state management.
- `components/`: UI components for controls and image workspace.
- `services/`: API integration services.
- `types.ts`: Global TypeScript definitions.

## 🎨 UI/UX Philosophy

The interface follows a "distraction-free" philosophy:
- **Minimalist Design**: Generous whitespace and a clean, monochromatic palette.
- **Intuitive Flow**: A clear three-step process—Upload, Configure, Generate.
- **Responsive Workspace**: Large preview area that adapts to the selected aspect ratio.

## 📄 License

MIT License. See LICENSE for more details.
