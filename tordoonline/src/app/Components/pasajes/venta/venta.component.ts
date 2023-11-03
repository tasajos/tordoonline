import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { SusuarioService } from 'src/app/Services/susuario.service';
import { ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {



  registroExitoso: boolean = false;
  botonConfirmarHabilitado: boolean = true;
  botonConfirmarModalHabilitado: boolean = true;
  


  
  flota: any = {
    asiento: null,
    fecha: '',
    origen: '',
    destino: '',
    nit: '',
    telefono: '',
    email: '',
    ci: '',
    precio: '',
    tipo: '',
    hora: '',
    placa: '',
    fechanacimiento: '',
    metodopago: '',
    // ... otros campos
  };
  nombre: string = '';
  apellidos: string = '';
  fecha: string = '';
  origen: string = '';
  destino: string = '';
  nit: string = '';
  telefono:  string = '';
  email: string = '';
  ci: number | null = null; // Inicializa ci como null en lugar de 0
  precio:  number = 0;
  tipo: string = '';
  hora: string = '';
  placa: string = '';
  fechanacimiento: Date| null = null;
  metodopago: string = '';
  estado: string = '';
  // ... otros campos

  constructor(private route: ActivatedRoute, private rtServicio: SusuarioService,
    private routes: Router) {}


  ngOnInit(): void {
  
    
    this.flota.asiento = this.route.snapshot.queryParamMap.get('asiento');
    //this.flota.fecharegistro = this.route.snapshot.queryParamMap.get('fecharegistro');
    const fecharegistroParam = this.route.snapshot.queryParamMap.get('fecharegistro');
  if (fecharegistroParam !== null) {
    this.flota.fecharegistro = this.formatDate(fecharegistroParam);
  }
    
    this.flota.origen = this.route.snapshot.queryParamMap.get('origen');
    this.flota.destino = this.route.snapshot.queryParamMap.get('destino');
    //this.flota.precio = this.route.snapshot.queryParamMap.get('precio');
    this.flota.precio = this.route.snapshot.queryParamMap.get('precio');
    this.flota.tipo = this.route.snapshot.queryParamMap.get('tipo');
    this.flota.hora = this.route.snapshot.queryParamMap.get('hora');
    this.flota.placa = this.route.snapshot.queryParamMap.get('placa');
  }

  onSubmit(formData: any) {
    console.log('Datos del formulario:', formData);


    const pasajero = {
      asiento: this.flota.asiento,
      fecha: this.flota.fecha, // Asegúrate de proporcionar un valor para fecha
      nombre: this.nombre,
      apellidos: this.apellidos,
      nit: this.nit,
      ci: this.ci || 0,
      precio: this.flota.precio,
      preciocalculado: 0, // Asegúrate de proporcionar un valor para preciocalculado
      tipo: this.flota.tipo,
      telefono: this.telefono, // Convierte a cadena
      email: this.email,
      origen: this.flota.origen,
      destino: this.flota.destino,
      hora: this.flota.hora,
      placa: this.flota.placa,
      fechanacimiento: this.fechanacimiento|| null,
      metodopago: this.metodopago,
      estado: this.estado
      // ... otros campos
    };

 // Después de un registro exitoso
 this.registroExitoso = true;
    // Aquí puedes procesar los datos del formulario, como enviarlos a un backend

    this.rtServicio.postaddpasajero(pasajero).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.botonConfirmarModalHabilitado = false;
        // Realiza cualquier otra acción que desees después de registrar los datos
      },
      (error) => {
        console.error('Error al registrar:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
     
    this.botonConfirmarHabilitado = false;
  }

  openModal() {
    if (this.metodopago === 'qr') {
      // Abre el modal "QR"
      const modalQR = document.getElementById('staticBackdropQR');
      if (modalQR) {
        const bsModal = new bootstrap.Modal(modalQR);
        bsModal.show();
        // Deshabilita el botón "Confirmar" después de abrir el modal
      this.botonConfirmarHabilitado = false;
      }
    } else if (this.metodopago === 'efectivo') {
      // Abre el modal "Efectivo"
      const modalEfectivo = document.getElementById('staticBackdropefectivo');
      if (modalEfectivo) {
        const bsModal = new bootstrap.Modal(modalEfectivo);
        bsModal.show();
        // Deshabilita el botón "Confirmar" después de abrir el modal
      this.botonConfirmarHabilitado = false;
      }
    }
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  volver() {
    // Redirige al usuario a la página principal
    this.routes.navigateByUrl('/');
  }


  generatePDF() {
    let docDefinition = {
      content: [
        // Puedes agregar más elementos a este array para estructurar tu PDF.
        { text: 'Recibo', style: 'header' },
        { text: 'Número de Asiento: ' + this.flota.asiento },
        { text: 'Fecha: ' + this.flota.fecharegistro },
        { text: 'Origen: ' + this.flota.origen + ' - Destino: ' + this.flota.destino },
        { text: 'Nombre: ' + this.nombre + ' ' + this.apellidos },
        // ... Agrega aquí todos los campos que desees.
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
        // Puedes definir más estilos aquí.
      }
    };
  
    pdfMake.createPdf(docDefinition).download('Datos_Registrados.pdf');
  }
  

}