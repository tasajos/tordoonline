import { Component, OnInit } from '@angular/core';
import { SflotaService } from 'src/app/Services/sflota.service';
import { registrarflotaInter } from 'src/app/Interfaz/flota';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.component.html',
  styleUrls: ['./pasajes.component.css']
})
export class PasajesComponent {

  numeroAsientos!: number;
  placa!: string;

  constructor(private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
          this.placa = params['placa'];
          this.numeroAsientos = +params['cantidadpasajeros'];  // Convertimos la cadena a número
          console.log('Placa:', this.placa);
          console.log('Número de asientos:', this.numeroAsientos);
      });
  }

  getArrayOfSize(size: number): any[] {
      return new Array(size).fill(null);
  }
}