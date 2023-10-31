import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SusuarioService } from 'src/app/Services/susuario.service'; // Importa el servicio correcto
import { VentaPasajeticketInter } from 'src/app/Interfaz/usuario';

@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.component.html',
  styleUrls: ['./pasajes.component.css']
})
export class PasajesComponent implements OnInit {
  numeroAsientos!: number;
  placa!: string;
  destino!: string;
  origen!: string;
  tipo!: string;
  precio!: string;
  hora!: string;
  fecharegistro!: string;
  pasajerosVendidos: VentaPasajeticketInter[] = []; // Crear una propiedad para almacenar los asientos vendidos

  constructor(
    private route: ActivatedRoute,
    private susuarioService: SusuarioService // Inyectar el servicio correcto
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.placa = params['placa'];
      this.fecharegistro = params['fecharegistro'];
      this.numeroAsientos = +params['cantidadpasajeros'];
      this.destino = params['destino'];
      this.origen = params['origen'];
      this.tipo = params['tipo'];
      this.hora = params['hora'];
      this.precio = params['precio'];
      console.log('Placa:', this.placa);
      console.log('Número de asientos:', this.numeroAsientos);
      console.log('Origen', this.origen);
      console.log('Destino', this.destino);

      // Llamar al servicio correcto para obtener la información de los asientos vendidos
      this.susuarioService.getpasajerosventa().subscribe(data => {
        this.pasajerosVendidos = data;
      });
    });
  }

  isSeatSold(seatNumber: number): boolean {
    return this.pasajerosVendidos.some(pasajero =>
      +pasajero.asiento === seatNumber && pasajero.placa === this.placa
    );
  }
  getArrayOfSize(size: number): number[] {
    return Array.from({ length: size }, (_, index) => index + 1);
  }
}

