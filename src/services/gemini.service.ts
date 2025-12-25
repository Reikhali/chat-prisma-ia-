import { Injectable, signal } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenAI;
  public error = signal<string | null>(null);
  public isInitialized = signal(false);

  constructor() {
    if (!process.env.API_KEY) {
      const errorMessage = 'Chave de API não encontrada. Por favor, defina a variável de ambiente API_KEY.';
      console.error(errorMessage);
      this.error.set(errorMessage);
      this.genAI = null as any;
      this.isInitialized.set(false);
    } else {
       this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
       this.isInitialized.set(true);
    }
  }

  async generateContent(prompt: string): Promise<string> {
    if (!this.isInitialized()) {
      const errorMessage = 'Cliente Gemini AI não inicializado pois a API_KEY está ausente.';
      this.error.set(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    try {
      this.error.set(null);
      const response: GenerateContentResponse = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: 'Você é um assistente de IA chamado PRISMA. Todas as suas respostas devem ser em português do Brasil.',
        }
      });

      return response.text;
    } catch (e) {
      console.error('Error generating content:', e);
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      this.error.set(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async generateContentWithImage(prompt: string, image: File): Promise<string> {
    if (!this.isInitialized()) {
      const errorMessage = 'Cliente Gemini AI não inicializado pois a API_KEY está ausente.';
      this.error.set(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    const imageBase64 = await this.fileToBase64(image);

    const imagePart = {
      inlineData: {
        mimeType: image.type,
        data: imageBase64,
      },
    };
    
    const textPart = { text: prompt };

    try {
      this.error.set(null);
      const response: GenerateContentResponse = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
         config: {
            systemInstruction: 'Você é um assistente de IA chamado PRISMA. Todas as suas respostas devem ser em português do Brasil.',
        }
      });
      return response.text;

    } catch (e) {
      console.error('Error generating content with image:', e);
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      this.error.set(errorMessage);
      throw new Error(errorMessage);
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = (reader.result as string).split(',')[1];
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
  }
}
