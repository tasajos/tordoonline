import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SflotaService } from 'src/app/Services/sflota.service'; // Importa el servicio original
import { registrarflotaInter } from 'src/app/Interfaz/flota';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { Modal } from 'bootstrap'; // Importa Bootstrap
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubus',
  templateUrl: './menubus.component.html',
  styleUrls: ['./menubus.component.css']
})
export class MenubusComponent implements OnInit, AfterViewInit {

  //declaracion de variables de fechas
  startDate!: Date;
  minDate!: Date;

  //declaracion de variables de modal
  modalRef!: BsModalRef;

 
  //declaracion de variables de origen y destino
  mostrarAlerta: boolean = false;
   mostrarTabla: boolean = false;
   mensajeAlerta: string = '';

   mostrarResultados: boolean = false;

   
  registrosFlota: registrarflotaInter[] = [];
  origen: string = '';
  destino: string = '';
  fecharegistro: string = '';
  tipo: string = '';
  hora: string = '';
  precio: string = '';
  mostrarModal: boolean = false;
  registro: any;
 

  constructor(private verFlota: SflotaService, 
    private buscarFlotaService: SflotaService, // Utiliza el servicio SflotaService
    private modalService: BsModalService,
    private router: Router) {}

    ngOnInit(): void {
      this.verFlota.getflota().subscribe((data: registrarflotaInter[]) => {
        this.registrosFlota = data.filter((registro: registrarflotaInter) => this.isTodayOrFutureDate(registro.fecharegistro));
      });
  }

  ngAfterViewInit(): void {
   
  }

  

  buscarPorOrigenYDestino() {
    if (!this.origen || !this.destino || !this.startDate) {
      return Promise.resolve(); // No hagas nada si faltan datos
    }
  
    return new Promise<void>((resolve, reject) => {
      this.buscarFlotaService
        .buscarFlotaPorFecha(this.origen, this.destino, this.startDate)
        .subscribe(
          (data: registrarflotaInter[] | any) => {
            if (Array.isArray(data)) {
              // Filtra los registros antes de asignarlos a this.registrosFlota
              this.registrosFlota = data.filter((registro: registrarflotaInter) =>
                this.isTodayOrFutureDate(registro.fecharegistro)
              );
  
              if (this.registrosFlota.length === 0) {
                // No hay resultados
                this.mostrarAlerta = true;
              } else {
                // Hay resultados
                this.mostrarTabla = true;
              }
  
              if (data.length > 0 && this.registrosFlota.length === 0) {
                this.mostrarAlerta = true;
              }
  
              resolve(); // Resuelve la promesa después de buscar
            }
          },
          (error) => {
            console.error('Error al realizar la búsqueda.', error);
            alert('Error al realizar la búsqueda.');
            reject(error);
          }
        );
    });
  }

//formatear fecha

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

  //comprobar si la fecha es actual o futura
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
  onDateChange(event: any, datepicker: MatDatepicker<Date>) {
    const selectedDate: Date = event.value;
    const currentDate: Date = new Date();
  
    if (selectedDate < currentDate) {
      // Si el usuario selecciona una fecha anterior a la actual, muestra un mensaje de error
      this.mostrarAlerta = true;
      this.mensajeAlerta = 'No se pueden buscar registros en fechas pasadas.';
    } else {
      // Actualiza la fecha de inicio correctamente
      this.startDate = selectedDate;
      this.mostrarAlerta = false; // Oculta el mensaje de error si estaba visible
    }
    datepicker.close(); // Cierra el datepicker después de seleccionar una fecha
  }

  openModal() {
    this.modalRef = this.modalService.show('modalTemplate'); // Asegúrate de que el ID sea el correcto
  }

  closeModal() {
    this.modalRef.hide();
  }

  buscarYMostrarModal() {
    // Llama a la función para buscar
    this.buscarPorOrigenYDestino()
      .then((data: any) => {
        // Abre el modal solo si no hay resultados
        if (this.registrosFlota.length === 0) {
          this.openModal();
          this.mensajeAlerta = ''; // Borra cualquier mensaje anterior
        } else {
          // Muestra el mensaje del backend si no se encontraron resultados
          this.mostrarAlerta = true;
          this.mensajeAlerta = data.mensaje;
        }
      })
      .catch((error) => {
        // Manejar otros errores aquí
        console.error('Error al buscar flota:', error);
        this.mostrarAlerta = true;
        this.mensajeAlerta = 'Error al realizar la búsqueda.';
      });
  }
}  
