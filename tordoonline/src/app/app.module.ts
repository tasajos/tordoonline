import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { SlideComponent } from './Components/principal/slide/slide.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MenuComponent,
    SlideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
