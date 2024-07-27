import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChefListComponent } from './components/chef-list/chef-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    ChefListComponent,
    HeaderComponent,
    ChefProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
