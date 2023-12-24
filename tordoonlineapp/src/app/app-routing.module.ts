import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './Components/principal/principal.component';
import { PasajesComponent } from './Components/pasajes/pasajes.component';
import { VerflotaComponent } from './Components/pasajes/flota/verflota/verflota.component';
import { ListaflotaComponent } from './Components/pasajes/flota/listaflota/listaflota.component';
import { VentaComponent } from './Components/pasajes/venta/venta.component';
import { ReservpComponent } from './Components/menu/reservp/reservp.component';
import { MenslideComponent } from './Components/menu/menslide/menslide.component';
import { CounterComponent } from './Components/menu/counter/counter.component';
import { CboliviaComponent } from './Components/menu/cbolivia/cbolivia.component';
import { CrutasComponent } from './Components/menu/crutas/crutas.component';
import { CtipsviajeComponent } from './Components/menu/ctipsviaje/ctipsviaje.component';


const routes: Routes = [
  // Define tus rutas aquí
  {path: '', redirectTo:'principal', pathMatch:'full'},
  {path: 'principal',component:PrincipalComponent},
  {path: 'ventas',component:PasajesComponent},
  {path: 'ventapasaje',component:VentaComponent},
  {path: 'vflotas',component:VerflotaComponent},
  {path: 'pasajes',component:PasajesComponent},
  {path: 'pasajeros-tabla/:count',component:ListaflotaComponent},
  {path: 'reservp',component:ReservpComponent},
  {path: 'mslide',component:MenslideComponent},
  {path: 'counter',component:CounterComponent},
  {path: 'cbolivia',component:CboliviaComponent},
  {path: 'crutas',component:CrutasComponent},
  {path: 'ctips',component:CtipsviajeComponent},
{path: '**', redirectTo:'principal', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
