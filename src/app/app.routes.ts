import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home},
    { path: 'missions', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions) },
    { path: 'add-mission', loadComponent: () => import('./pages/new-mission/new-mission').then(m => m.NewMission) },
    { path: "login", loadComponent: () => import('./auth/login/login').then(l => l.Login)}
];
