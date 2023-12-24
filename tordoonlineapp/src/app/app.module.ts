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
import { VentaComponent } from './Components/pasajes/venta/venta.component';
import { FooterComponent } from './Components/principal/footer/footer.component';
import { MainslideComponent } from './Components/principal/mainslide/mainslide.component';
import { ReservpComponent } from './Components/menu/reservp/reservp.component';
import { MenslideComponent } from './Components/menu/menslide/menslide.component';
import { CounterComponent } from './Components/menu/counter/counter.component';
import { CboliviaComponent } from './Components/menu/cbolivia/cbolivia.component';
import { CrutasComponent } from './Components/menu/crutas/crutas.component';
import { CtipsviajeComponent } from './Components/menu/ctipsviaje/ctipsviaje.component';



//pdf

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
    ListaflotaComponent,
    VentaComponent,
    FooterComponent,
    MainslideComponent,
    ReservpComponent,
    MenslideComponent,
    CounterComponent,
    CboliviaComponent,
    CrutasComponent,
    CtipsviajeComponent
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
    MatIconModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
