import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'chefs', loadComponent: () => import('./components/chef-list/chef-list.component').then(m => m.ChefListComponent) },
  { path: 'chefs/:id', loadComponent: () => import('./components/chef-profile/chef-profile.component').then(m => m.ChefProfileComponent) },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
