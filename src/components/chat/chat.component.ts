import { Component, ChangeDetectionStrategy, signal, computed, inject, ViewChild, ElementRef, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

interface Message {
  role: 'user' | 'model';
  content: string;
  imagePreview?: string;
}

// Extend the global Window interface for the SpeechRecognition API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule]
})
export class ChatComponent {
  geminiService = inject(GeminiService);
  userInput = signal('');
  messages = signal<Message[]>([]);
  loading = signal(false);
  isRecording = signal(false);
  selectedImage = signal<File | null>(null);
  selectedImagePreview = signal<string | null>(null);
  
  isChatting = computed(() => this.messages().length > 0);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('fileInput') private fileInput!: ElementRef<HTMLInputElement>;

  constructor() {
    afterNextRender(() => {
        const observer = new MutationObserver(() => {
            this.scrollToBottom();
        });
        observer.observe(this.chatContainer.nativeElement, {
            childList: true
        });
    });
  }

  async sendMessage(): Promise<void> {
    const prompt = this.userInput().trim();
    if ((!prompt && !this.selectedImage()) || this.loading() || !this.geminiService.isInitialized()) {
      if (!this.geminiService.isInitialized()) {
        console.error("Gemini Service not initialized. Check API Key.");
      }
      return;
    }
    
    this.loading.set(true);
    const userMessage: Message = { role: 'user', content: prompt };
    if (this.selectedImagePreview()) {
      userMessage.imagePreview = this.selectedImagePreview();
    }
    this.messages.update(current => [...current, userMessage]);
    
    const imageFile = this.selectedImage();
    this.clearAttachment();
    this.userInput.set('');

    try {
      let response: string;
      if (imageFile) {
        response = await this.geminiService.generateContentWithImage(prompt, imageFile);
      } else {
        response = await this.geminiService.generateContent(prompt);
      }
      this.messages.update(current => [...current, { role: 'model', content: response }]);
    } catch (error) {
      this.messages.update(current => [...current, { role: 'model', content: 'Desculpe, encontrei um erro. Por favor, verifique sua Chave de API ou tente novamente.' }]);
    } finally {
      this.loading.set(false);
    }
  }
  
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImage.set(file);

      const reader = new FileReader();
      reader.onload = (e) => this.selectedImagePreview.set(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  clearAttachment(): void {
    this.selectedImage.set(null);
    this.selectedImagePreview.set(null);
    this.fileInput.nativeElement.value = '';
  }

  startVoiceInput(): void {
    const recognition = new window.webkitSpeechRecognition();
    if (!recognition) {
      alert('Reconhecimento de voz não é suportado neste navegador.');
      return;
    }
    
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.isRecording.set(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userInput.set(this.userInput() + transcript);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };
    
    recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
    };

    recognition.onend = () => {
        this.isRecording.set(false);
    };

    recognition.start();
  }

  sendStarterPrompt(prompt: string): void {
    if(this.isChatting()) {
      this.userInput.set(prompt);
    } else {
      this.userInput.set(prompt);
      this.sendMessage();
    }
  }

  formatMessageContent(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>')       // Italic
      .replace(/\n/g, '<br>');                      // Line breaks
  }

  showHistory(): void {
    alert('Funcionalidade de Histórico será implementada em breve!');
  }

  showExplore(): void {
    alert('Funcionalidade de Explorar será implementada em breve!');
  }

  showSettings(): void {
    alert('Funcionalidade de Configurações será implementada em breve!');
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
