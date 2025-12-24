import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RecentFile {
  name: string;
  size: string;
  modified: string;
  type: 'Document' | 'Data' | 'Image' | 'Audio' | 'Text' | 'Code';
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
      name: 'Project_Alpha_Specs.pdf',
      size: '2.4 MB',
      modified: 'Today, 10:23 AM',
      type: 'Document',
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
      name: 'dataset_v4_clean.csv',
      size: '150 MB',
      modified: 'Yesterday',
      type: 'Data',
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
      name: 'generated_neon_city.png',
      size: '4.2 MB',
      modified: 'Oct 24, 2023',
      type: 'Image',
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
      name: 'voice_command_log.mp3',
      size: '2.8 MB',
      modified: 'Oct 22, 2023',
      type: 'Audio',
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
      name: 'meeting_transcript_final.txt',
      size: '12 KB',
      modified: 'Oct 20, 2023',
      type: 'Text',
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
      name: 'model_weights.json',
      size: '56 KB',
      modified: 'Oct 18, 2023',
      type: 'Code',
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
