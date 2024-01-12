import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { SusuarioService } from 'src/app/Services/susuario.service'; // Importa el servicio correcto
import { VentaPasajeticketInter } from 'src/app/Interfaz/usuario';
import { MatDialog } from '@angular/material/dialog';

declare var $: any; // Declara la variable jQuery


@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.component.html',
  styleUrls: ['./pasajes.component.css']
})
export class PasajesComponent implements OnInit {
  seatNumber: number = 1;
  //asientosVendidos: boolean[] = [false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false];
  asientosVendidos: Set<number> = new Set<number>();
  asientos: (number | null)[][] = [
    [19, 16, 13, 10, 7, 4, 1],
    [20, 17, 14, 11, 8, 5, 2],
    [null, null, null, null, null, null, null],
    [21, 18, 15, 12, 9, 6, 3]
  ];
  
  asientos39: (number | null)[][] = [
    [19, 16, 13, 10, 7, 4, 1],
    [20, 17, 14, 11, 8, 5, 2],
    [null, null, null, null, null, null, null],
    [21, 18, 15, 12, 9, 6, 3],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [37, 34, 31, 28, 25, 22],
    [38, 35, 32, 29, 26, 23],
    [null, null, null, null, null, null, null],
    [39, 36, 33, 30, 27, 24]
  ];


  asiento39v: (number | null)[][] = [

    [null,null, null, null,null,null,null,null,null,null],
    [null,null, null, null,null,null,null,null,null,null],
    [1, 2, null, 3,null,null,null,null,null,null],
    [4, 5, null, 6,null,null,22,23,null,24],
    [7, 8, null, 9,null,null,25,26,null,27],
    [10, 11, null, 12,null,null,28,29,null,30],
    [13, 14, null, 15,null,null,31,32,null,33],
    [16, 17, null, 18,null,null,34,35,null,36],
    [19, 20, null, 21,null,null,37,38,null,39],
    [null, null, null, null,null,null,null,null,null,null],
   
  ];


  rowIndex: number | null = null;
  
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
    private susuarioService: SusuarioService,
    private router: Router // Inyectar el servicio correcto
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
  
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
  
  getArrayOfSize(size: number): number[] {
    return Array.from({ length: size }, (_, index) => index + 1);
  }
  redirectToHome() {
    this.router.navigate(['/']); // Cambia '/' por la ruta de tu página principal
  }

  openSoldSeatModal(seatNumber: number) {
    if (this.isSeatSold(seatNumber)) {
      $('#soldSeatModal').modal('show'); // Abre el modal
    }
  }
  
  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  public calculateFloor(value: number): number {
    return Math.floor(value);
  }
  incrementSeatNumber() {
    this.seatNumber++;
  }
  assignSeatNumber(colIndex: number) {
    if (colIndex === 0 || colIndex === 3) {
      return this.seatNumber++;
    }
    return '';
  }
}
