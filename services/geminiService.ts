
import { GoogleGenAI } from "@google/genai";
import { StudioSettings, AppMode } from "../types";

export const generateProductImage = async (
  base64Image: string,
  settings: StudioSettings
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const { mode, backgroundStyle, sceneType, aspectRatio, gender } = settings;

  let prompt = "";
  if (mode === AppMode.PRODUCT_ONLY) {
    prompt = `Keep the product in the provided image perfectly accurate in shape, color, and texture. 
    Replace the background with a high-end, professional ${backgroundStyle} style. 
    Ensure soft, diffused studio lighting and natural, soft shadows. 
    The composition should be minimal and premium. 
    Do not modify the product details. 
    Output should be a high-resolution professional product shot.`;
  } else {
    prompt = `Create a high-end editorial lifestyle photograph. 
    Place the product from the image into the scene. The product must remain perfectly accurate in shape, color, and all details. 
    Include a realistic human ${gender.toLowerCase()} avatar naturally interacting with or holding the product. 
    The setting is a ${sceneType} environment. 
    Ensure consistent lighting, realistic skin tones, and soft shadows that blend the avatar, product, and environment together seamlessly. 
    The product must remain the hero of the composition.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image was generated in the response.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
