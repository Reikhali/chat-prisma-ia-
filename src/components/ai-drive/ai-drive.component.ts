import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RecentFile {
  name: string;
  size: string;
  modified: string;
  type: 'Documento' | 'Dados' | 'Imagem' | 'Áudio' | 'Texto' | 'Código';
  icon: string;
  colorClasses: {
    bg: string;
    text: string;
    border: string;
    tagBg: string;
    tagText: string;
  };
}

@Component({
  selector: 'app-ai-drive',
  templateUrl: './ai-drive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class AiDriveComponent {
  recentFiles = signal<RecentFile[]>([
    {
      name: 'Especificacoes_Projeto_Alpha.pdf',
      size: '2.4 MB',
      modified: 'Hoje, 10:23',
      type: 'Documento',
      icon: 'picture_as_pdf',
      colorClasses: {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/20',
        tagBg: 'bg-primary/10',
        tagText: 'text-primary'
      }
    },
    {
      name: 'dataset_v4_limpo.csv',
      size: '150 MB',
      modified: 'Ontem',
      type: 'Dados',
      icon: 'table_chart',
      colorClasses: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500/20',
        tagBg: 'bg-green-500/10',
        tagText: 'text-green-400'
      }
    },
    {
      name: 'cidade_neon_gerada.png',
      size: '4.2 MB',
      modified: '24 de Out, 2023',
      type: 'Imagem',
      icon: 'image',
      colorClasses: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/20',
        tagBg: 'bg-purple-500/10',
        tagText: 'text-purple-400'
      }
    },
    {
      name: 'log_comando_de_voz.mp3',
      size: '2.8 MB',
      modified: '22 de Out, 2023',
      type: 'Áudio',
      icon: 'mic',
      colorClasses: {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        border: 'border-yellow-500/20',
        tagBg: 'bg-yellow-500/10',
        tagText: 'text-yellow-400'
      }
    },
    {
      name: 'transcricao_reuniao_final.txt',
      size: '12 KB',
      modified: '20 de Out, 2023',
      type: 'Texto',
      icon: 'description',
      colorClasses: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/20',
        tagBg: 'bg-blue-500/10',
        tagText: 'text-blue-400'
      }
    },
     {
      name: 'pesos_do_modelo.json',
      size: '56 KB',
      modified: '18 de Out, 2023',
      type: 'Código',
      icon: 'code',
      colorClasses: {
        bg: 'bg-pink-500/10',
        text: 'text-pink-400',
        border: 'border-pink-500/20',
        tagBg: 'bg-pink-500/10',
        tagText: 'text-pink-400'
      }
    }
  ]);

  isGridView = signal(true);
}
