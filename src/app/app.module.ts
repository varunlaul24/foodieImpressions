import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ChefListComponent } from './components/chef-list/chef-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({ 
    declarations: [
        AppComponent,
        ChefListComponent,
        HeaderComponent,
        ChefProfileComponent,
        HomeComponent,
        FooterComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ], 
    providers: [provideHttpClient(withInterceptorsFromDi())] 
})

export class AppModule { }
