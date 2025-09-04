import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  {
    path: 'demo',
    loadComponent: () => import('./demo/demo-page.component').then(m => m.DemoPageComponent)
  },
  { path: '**', redirectTo: 'demo' }
];
