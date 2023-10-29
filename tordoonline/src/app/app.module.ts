//http
import { HttpClientModule } from '@angular/common/http';



//angular

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

//trabajo
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { MenuComponent } from './Components/menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { SlideComponent } from './Components/principal/slide/slide.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecerxComponent } from './Components/principal/cabecerx/cabecerx.component';
import { MenubusComponent } from './Components/principal/menubus/menubus.component';



@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MenuComponent,
    SlideComponent,
    CabecerxComponent,
    MenubusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
