import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './Components/principal/principal.component';


const routes: Routes = [
  // Define tus rutas aquí
  {path: '', redirectTo:'principal', pathMatch:'full'},
  {path: 'principal',component:PrincipalComponent},
{path: '**', redirectTo:'principal', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
