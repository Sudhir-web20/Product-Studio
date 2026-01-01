
import React from 'react';
import { 
  AppMode, 
  BackgroundStyle, 
  SceneType, 
  AspectRatio, 
  Gender, 
  StudioSettings 
} from '../types';

interface ControlPanelProps {
  settings: StudioSettings;
  setSettings: (settings: StudioSettings) => void;
  onUpload: (file: File) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasSource: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  settings, 
  setSettings, 
  onUpload, 
  onGenerate,
  isGenerating,
  hasSource
}) => {
  const updateSetting = <K extends keyof StudioSettings>(key: K, value: StudioSettings[K]) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-10">
      {/* Mode Selector */}
      <section>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Creative Mode</label>
        <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
          <button 
            onClick={() => updateSetting('mode', AppMode.PRODUCT_ONLY)}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${settings.mode === AppMode.PRODUCT_ONLY ? 'bg-white shadow-sm text-black border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Product Only
          </button>
          <button 
            onClick={() => updateSetting('mode', AppMode.PRODUCT_AVATAR)}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${settings.mode === AppMode.PRODUCT_AVATAR ? 'bg-white shadow-sm text-black border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Product + Avatar
          </button>
        </div>
      </section>

      {/* Image Upload */}
      <section>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">1. Upload Product</label>
        <div className="relative group">
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`border border-dashed rounded-2xl p-5 text-center transition-all ${hasSource ? 'border-indigo-100 bg-indigo-50/20' : 'border-gray-200 group-hover:border-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${hasSource ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-300'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={hasSource ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
              </svg>
            </div>
            <p className={`text-[11px] font-medium ${hasSource ? 'text-indigo-600' : 'text-gray-400'}`}>
              {hasSource ? 'Change image' : 'Select image'}
            </p>
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <div className="space-y-8 animate-in fade-in duration-500">
        <section>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">2. Configure Scene</label>
          
          <div className="space-y-6">
            {/* Aspect Ratio */}
            <div>
              <p className="text-[10px] text-gray-400 font-medium mb-2">Canvas Ratio</p>
              <div className="flex gap-2">
                {Object.values(AspectRatio).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => updateSetting('aspectRatio', ratio)}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${settings.aspectRatio === ratio ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Style or Scene Selector */}
            {settings.mode === AppMode.PRODUCT_ONLY ? (
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-2">Studio Style</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(BackgroundStyle).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateSetting('backgroundStyle', style)}
                      className={`py-2 px-3 text-left text-[10px] font-bold rounded-lg border transition-all ${settings.backgroundStyle === style ? 'bg-zinc-50 border-black text-black' : 'bg-white border-gray-100 text-gray-400 hover:bg-zinc-50'}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-2">Environment</p>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.values(SceneType).map((scene) => (
                      <button
                        key={scene}
                        onClick={() => updateSetting('sceneType', scene)}
                        className={`py-2 px-3 text-left text-[10px] font-bold rounded-lg border transition-all ${settings.sceneType === scene ? 'bg-zinc-50 border-black text-black' : 'bg-white border-gray-100 text-gray-400 hover:bg-zinc-50'}`}
                      >
                        {scene}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-2">Avatar Gender</p>
                  <div className="flex gap-2">
                    {Object.values(Gender).map((g) => (
                      <button
                        key={g}
                        onClick={() => updateSetting('gender', g)}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${settings.gender === g ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Generate Button */}
      <div className="pt-2">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !hasSource}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
            isGenerating || !hasSource 
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100' 
              : 'bg-black text-white hover:bg-zinc-800 active:scale-[0.98] shadow-lg shadow-black/10'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating
            </>
          ) : (
            'Generate Image'
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
