import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaPasajeticketInter } from 'src/app/Interfaz/usuario';
import { SusuarioService } from 'src/app/Services/susuario.service';

@Component({
  selector: 'app-listaflota',
  templateUrl: './listaflota.component.html',
  styleUrls: ['./listaflota.component.css']
})
export class ListaflotaComponent implements OnInit {

  passengerCount: number = 0;
  flota: any;
  pasajerosVendidos: VentaPasajeticketInter[] = [];

  constructor(private route: ActivatedRoute,
              private asientoser: SusuarioService) {}

  ngOnInit(): void {
    const count = this.route.snapshot.paramMap.get('count');
    this.passengerCount = count ? +count : 0;
    
    // Leer los query params para obtener la información de la flota
    const origen = this.route.snapshot.queryParamMap.get('origen');
    const destino = this.route.snapshot.queryParamMap.get('destino');
    const hora = this.route.snapshot.queryParamMap.get('hora');
    const placa = this.route.snapshot.queryParamMap.get('placa');
    const fecharegistro = this.route.snapshot.queryParamMap.get('fecharegistro');
    const precio = this.route.snapshot.queryParamMap.get('precio');
    const tipo = this.route.snapshot.queryParamMap.get('tipo');

    this.flota = {
      origen: origen,
      destino: destino,
      hora: hora,
      placa: placa,
      precio: precio,
      tipo: tipo,
      fecharegistro: this.formatDate(fecharegistro || '')
    };
  
    this.asientoser.getpasajerosventa().subscribe((data: VentaPasajeticketInter[]) => {
      this.pasajerosVendidos = data;
    });
  }

  isSeatSold(seatNumber: number): boolean {
    return this.pasajerosVendidos.some(pasajero => 
      +pasajero.asiento === seatNumber && pasajero.placa === this.flota.placa
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
