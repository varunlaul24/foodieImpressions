import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefListComponent } from './components/chef-list/chef-list.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chefs', component: ChefListComponent },
  { path: 'chefs/:id', component: ChefProfileComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
