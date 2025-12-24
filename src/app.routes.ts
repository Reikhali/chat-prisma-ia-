import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { AiDriveComponent } from './components/ai-drive/ai-drive.component';

export const routes: Routes = [
  { path: '', component: ChatComponent, title: 'PRISMA IA - Chat' },
  { path: 'ai-drive', component: AiDriveComponent, title: 'PRISMA IA - AI Drive' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
