import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefListComponent } from './components/chef-list/chef-list.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';

const routes: Routes = [
  { path: 'chefs', component: ChefListComponent },
  { path: 'chefs/:id', component: ChefProfileComponent },
  { path: '', redirectTo: 'chefs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
