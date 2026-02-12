import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { guardAuth } from './guards/guardAuth';
import { guardAdmin } from './guards/guardAdmin';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home},

    { path: 'missions', loadComponent: () => import('./pages/missions/missions').then(m => m.Missions), canActivate : [guardAuth] },
    { path: 'missions/:id', loadComponent: () => import('./pages/missionsId/missionsId').then(m => m.MissionsId), canActivate : [guardAuth] },

    { path: "add-mission", loadComponent: () => import('./pages/new-mission/new-mission').then(m => m.NewMission), canActivate : [guardAdmin]},
    { path: "edit-mission/:id", loadComponent: () => import('./pages/missionsEdit/missionsEdit').then(m => m.MissionsEdit), canActivate : [guardAdmin]},
    { path: "delete-mission/:id", loadComponent: () => import('./pages/new-mission/new-mission').then(m => m.NewMission), canActivate : [guardAdmin]},

    { path: "login", loadComponent: () => import('./auth/login/login').then(l => l.Login)}
];
