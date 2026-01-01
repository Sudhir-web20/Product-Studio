
import React from 'react';
import { AspectRatio } from '../types';

interface ImageWorkspaceProps {
  sourceImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  aspectRatio: AspectRatio;
  onReset: () => void;
}

const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({ 
  sourceImage, 
  generatedImage, 
  isGenerating,
  aspectRatio,
  onReset
}) => {
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case AspectRatio.SIXTEEN_NINE: return 'aspect-[16/9]';
      case AspectRatio.FOUR_THREE: return 'aspect-[4/3]';
      case AspectRatio.ONE_ONE:
      default: return 'aspect-square';
    }
  };

  const ratioClass = getAspectRatioStyle();

  if (!sourceImage && !generatedImage && !isGenerating) {
    return (
      <div className={`w-full max-w-4xl ${ratioClass} bg-white rounded-[32px] border border-gray-100 flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in-95 duration-700 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]`}>
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-gray-50 animate-ping opacity-20"></div>
          <svg className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-light text-gray-900 mb-3 tracking-tight">Studio Preview Ready</h3>
        <p className="text-sm text-gray-400 max-w-xs font-light leading-relaxed">Your professional studio setup awaits. Upload a clear image of your product to begin.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl space-y-8">
      <div className={`relative w-full ${ratioClass} bg-white rounded-[40px] shadow-[0_48px_120px_-24px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex items-center justify-center transition-all duration-700`}>
        {isGenerating && (
          <div className="absolute inset-0 z-30 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
            <div className="w-48 h-[1px] bg-gray-100 rounded-full overflow-hidden relative mb-8">
              <div className="absolute inset-0 bg-black animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-2">AI Studio Processing</p>
            <p className="text-xs text-gray-400 font-light">Composing scene & lighting...</p>
          </div>
        )}

        {generatedImage ? (
          <img 
            src={generatedImage} 
            alt="Generated result" 
            className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000"
          />
        ) : sourceImage ? (
          <div className="w-full h-full flex items-center justify-center p-20 bg-gray-50/50">
            <img 
              src={sourceImage} 
              alt="Uploaded product" 
              className="max-h-full max-w-full object-contain opacity-40 grayscale blur-[2px]"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full border border-gray-100 backdrop-blur-sm">Source Preview</span>
            </div>
          </div>
        ) : null}

        {generatedImage && !isGenerating && (
          <div className="absolute bottom-8 right-8 z-20 flex gap-3 animate-in slide-in-from-bottom-4 duration-700">
            <a 
              href={generatedImage} 
              download="studio-shot.png"
              className="px-6 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-all hover:bg-zinc-800 active:scale-95 shadow-xl shadow-black/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Image
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {!isGenerating && generatedImage && (
        <div className="flex items-center justify-between px-4 animate-in fade-in duration-1000 delay-500">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Rendering Complete</span>
            </div>
            <div className="h-4 w-px bg-gray-100"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ratio: {aspectRatio}</span>
          </div>
          <button 
            onClick={onReset}
            className="text-[10px] text-gray-400 hover:text-black font-bold uppercase tracking-widest transition-all hover:tracking-[0.15em]"
          >
            Start Fresh
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageWorkspace;
