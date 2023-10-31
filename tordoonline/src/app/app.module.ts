//http
import { HttpClientModule } from '@angular/common/http';



//angular

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';


//trabajo
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { MenuComponent } from './Components/menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { SlideComponent } from './Components/principal/slide/slide.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecerxComponent } from './Components/principal/cabecerx/cabecerx.component';
import { MenubusComponent } from './Components/principal/menubus/menubus.component';
import { PasajesComponent } from './Components/pasajes/pasajes.component';
import { VerflotaComponent } from './Components/pasajes/flota/verflota/verflota.component';
import { ListaflotaComponent } from './Components/pasajes/flota/listaflota/listaflota.component';



@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MenuComponent,
    SlideComponent,
    CabecerxComponent,
    MenubusComponent,
    PasajesComponent,
    VerflotaComponent,
    ListaflotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
