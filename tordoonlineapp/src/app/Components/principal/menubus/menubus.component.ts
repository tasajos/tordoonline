import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SflotaService } from 'src/app/Services/sflota.service';
import { registrarflotaInter } from 'src/app/Interfaz/flota';
import { Modal } from 'bootstrap'; // <-- Importa Bootstrap
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubus',
  templateUrl: './menubus.component.html',
  styleUrls: ['./menubus.component.css']
})
export class MenubusComponent implements OnInit, AfterViewInit {
  mostrarTabla: boolean = false;
  registrosFlota: registrarflotaInter[] = [];
  origen: string = '';
  destino: string = '';
  fecharegistro: string = '';
  tipo: string = '';
  hora: string = '';
  precio: string = '';
  mostrarModal: boolean = false ;
  registro: any;
  @ViewChild('modalNoResultados') modalNoResultados!: ElementRef;
  private bsModal!: Modal; // Instancia del modal de Bootstrap

  @ViewChild('modalOrigenDestino') modalOrigenDestino!: ElementRef;
  private modalOD!: Modal;  // Instancia del nuevo modal

  constructor(private verFlota: SflotaService, private buscarFlotaService: SflotaService,
    private router: Router) {}

  ngOnInit(): void {
    this.verFlota.getflota().subscribe((data: registrarflotaInter[]) => {
      this.registrosFlota = data.filter((registro: registrarflotaInter) => this.isTodayOrFutureDate(registro.fecharegistro));
    });
  }

  ngAfterViewInit(): void {
    this.bsModal = new Modal(this.modalNoResultados.nativeElement);
    this.modalOD = new Modal(this.modalOrigenDestino.nativeElement);  // Inicialización del nuevo modal
  }

  buscarPorOrigenYDestino() {
    // Revisa si origen y destino están presentes
    if (!this.origen || !this.destino) {
      this.modalOD.show();  // Mostrar el modal de origen y destino
      return;
    }
    
    // Haces la petición a tu servicio
    this.buscarFlotaService.buscarFlota(this.origen, this.destino)
      .subscribe((data: registrarflotaInter[] | any) => {
        // Filtramos los registros por la fecha actual o futura
        this.registrosFlota = data.filter((registro: registrarflotaInter) => this.isTodayOrFutureDate(registro.fecharegistro));
        
        // Si no hay registros que coincidan, muestra el modal
        if (this.registrosFlota.length === 0) {
          this.bsModal.show();
        } else {
          this.mostrarTabla = true;
        }
      }, error => {
        console.error('Error al realizar la búsqueda.', error);
        alert('Error al realizar la búsqueda.');
      });
  }
  

  formatDate(dateInput: any): string {
    let date;
    try {
      if (dateInput instanceof Date) {
          date = dateInput;
      } else {
          date = new Date(dateInput);
      }
      
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error al formatear la fecha: ", error);
      return "Fecha no válida";
    }
  }

  isTodayOrFutureDate(dateInput: any): boolean {
    let inputDate;
    if (dateInput instanceof Date) {
      inputDate = dateInput;
    } else {
      inputDate = new Date(dateInput);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora, minuto, segundo y milisegundo a 0 para comparar solo la fecha.

    return inputDate >= today;
  }

  verAsientos(registro: any) {
    // Aquí puedes enviar cualquier dato que necesites, como la placa o el número de asientos de la flota
    this.router.navigate(['/pasajes'], { queryParams: { placa: registro.placa, cantidadpasajeros: registro.cantidadpasajeros,
      destino: registro.destino,
      origen: registro.origen,
      fecharegistro: registro.fecharegistro,
      tipo: registro.tipo,
      hora: registro.hora,
      precio: registro.precio, } });
}


}
