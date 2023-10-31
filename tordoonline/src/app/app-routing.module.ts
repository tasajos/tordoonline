import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './Components/principal/principal.component';
import { PasajesComponent } from './Components/pasajes/pasajes.component';
import { VerflotaComponent } from './Components/pasajes/flota/verflota/verflota.component';
import { ListaflotaComponent } from './Components/pasajes/flota/listaflota/listaflota.component';
import { VentaComponent } from './Components/pasajes/venta/venta.component';


const routes: Routes = [
  // Define tus rutas aquí
  {path: '', redirectTo:'principal', pathMatch:'full'},
  {path: 'principal',component:PrincipalComponent},
  {path: 'ventas',component:PasajesComponent},
  {path: 'ventapasaje',component:VentaComponent},
  {path: 'vflotas',component:VerflotaComponent},
  {path: 'pasajes',component:PasajesComponent},
  {path: 'pasajeros-tabla/:count',component:ListaflotaComponent},
{path: '**', redirectTo:'principal', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
