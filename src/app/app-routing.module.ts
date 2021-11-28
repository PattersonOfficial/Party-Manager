import { AuthenticationGuard } from './guards/authentication.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'party',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'reset',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'party',
    loadChildren: () =>
      import('./party/party.module').then((m) => m.PartyPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'party/:partyID',
    loadChildren: () =>
      import('./party/party.module').then((m) => m.PartyPageModule),
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
