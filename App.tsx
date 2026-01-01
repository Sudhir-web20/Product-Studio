
import React, { useState } from 'react';
import { 
  AppMode, 
  BackgroundStyle, 
  SceneType, 
  AspectRatio, 
  Gender, 
  StudioSettings 
} from './types';
import ControlPanel from './components/ControlPanel';
import ImageWorkspace from './components/ImageWorkspace';
import { generateProductImage } from './services/geminiService';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<StudioSettings>({
    mode: AppMode.PRODUCT_ONLY,
    backgroundStyle: BackgroundStyle.WHITE_STUDIO,
    sceneType: SceneType.STUDIO,
    aspectRatio: AspectRatio.ONE_ONE,
    gender: Gender.FEMALE,
  });

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSourceImage(e.target?.result as string);
      setGeneratedImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!sourceImage) {
      setError("Please upload a product image first.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateProductImage(sourceImage, settings);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-2">
            <h1 className="text-4xl font-light tracking-tight text-gray-900">Product Studio</h1>
            <p className="text-gray-400 font-light">Transform simple product shots into professional high-end photography using AI.</p>
          </div>
          <div className="relative group aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent"></div>
             <div className="relative text-gray-300">
                <svg className="w-20 h-20 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
             </div>
          </div>
          <button 
            onClick={() => setHasStarted(true)}
            className="w-full py-4 px-8 bg-black text-white rounded-2xl font-medium transition-all hover:bg-zinc-800 active:scale-[0.98] shadow-xl shadow-black/5"
          >
            Start Creating
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcfcfc]">
      <aside className="w-full md:w-80 lg:w-96 border-r border-gray-100 p-8 md:h-screen overflow-y-auto sticky top-0 bg-white z-10">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light tracking-tight text-gray-900 mb-0.5">Product Studio</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">AI Creative Suite</p>
          </div>
          <button onClick={() => setHasStarted(false)} className="text-gray-300 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
          </button>
        </div>

        <ControlPanel 
          settings={settings} 
          setSettings={setSettings} 
          onUpload={handleImageUpload}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          hasSource={!!sourceImage}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}
      </aside>

      <main className="flex-1 p-6 md:p-12 lg:p-16 flex items-center justify-center bg-[#f9f9f9]">
        <ImageWorkspace 
          sourceImage={sourceImage}
          generatedImage={generatedImage}
          isGenerating={isGenerating}
          aspectRatio={settings.aspectRatio}
          onReset={() => {
            setSourceImage(null);
            setGeneratedImage(null);
            setError(null);
          }}
        />
      </main>
    </div>
  );
};

export default App;
