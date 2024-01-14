import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { SusuarioService } from 'src/app/Services/susuario.service';
import { QrService } from 'src/app/Services/qr.service';
import {validaQrINterface  } from 'src/app/Interfaz/qr';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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


  resultadoValidacionQR: string = '';
  

  registroExitoso: boolean = false;
  @ViewChild('registroExitosoMessage') registroExitosoMessage: ElementRef | undefined;
  botonConfirmarHabilitado: boolean = true;
  botonConfirmarModalHabilitado: boolean = true;
  qrData: any; // Declara qrData aquí
  qrResponse: any;
  qrGenerated: boolean = false;
  qrValidarData: any;
  showSpinner: boolean = false;



  ngAfterViewInit(): void {
    // Oculta el mensaje de registro exitoso después de 4 segundos
    if (this.registroExitoso) {
      setTimeout(() => {
        if (this.registroExitosoMessage) {
          this.registroExitosoMessage.nativeElement.style.display = 'none';
        }
      }, 4000); // 4 segundos
    }
  }


  
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

  constructor(
    private route: ActivatedRoute,
    private rtServicio: SusuarioService,
    private routes: Router,
    private qrService: QrService,
    private router: Router ) {}


  ngOnInit(): void {
  

     // Agrega un manejador de eventos para el evento hidden.bs.modal
     
    
    this.flota.asiento = this.route.snapshot.queryParamMap.get('asiento');
    //this.flota.fecha = this.route.snapshot.queryParamMap.get('fecha');
    this.flota.fecharegistro = this.route.snapshot.queryParamMap.get('fecharegistro');
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


    this.qrData = {
      alias: 'Pasaje Tordo'+' Fecha: '+ this.flota.fecharegistro +' '+'Asiento: '+ this.flota.asiento +' ' + ' Nombres: '+this.nombre+ ' ' + this.apellidos + ' '+ ' Origen: '+ this.flota.origen + '--'+'Destino: '+ this.flota.destino + '--' +'Hora: '+ this.flota.hora +' '+ 'Placa: '+ this.flota.placa + ' '+'Precio: ' +this.flota.precio+ 'Bs ' + 'Tipo: '+ this.flota.tipo + ' ',
      callback: this.flota.asiento,
      detalleGlosa: 'Sistema Tordo ' +' ' + 'Ppx: ' + this.apellidos + ''+ ' Fecha: ' + this.flota.fecharegistro + ' '+' Asiento: ' +this.flota.asiento,	
      monto: this.flota.precio, // Asegúrate de que 'monto' sea un número
      moneda: 'BOB', // Asegúrate de que 'BOB' sea un string
      fechaVencimiento:  this.flota.fecharegistro, // Reemplaza 'fechahoy' con la fecha adecuada
      tipoSolicitud: 'API', // Asegúrate de que 'API' sea un string
      unicoUso: true,
    };

    console.log('qrData:', this.qrData);

    //qrvalidardata

    this.qrValidarData = {
      alias: this.qrData.alias
    }

    // Llama al servicio para generar el código QR
    this.qrService.createqrbe(this.qrData).subscribe(
      (response) => {
        console.log('Código QR generado:', response);

        // Modifica la asignación para incluir 'data:image/png;base64,'
    this.qrResponse = {
      objeto: {
        imagenQr: 'data:image/png;base64,' + response.objeto.imagenQr
      }
    };

        // Después de generar el código QR, puedes abrir el modal
        this.openModal();
      },
      (error) => {
        console.error('Error al generar el código QR:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );

    const pasajero = {
      asiento: this.flota.asiento,
      fecha: this.flota.fecharegistro, // Asegúrate de proporcionar un valor para fecha
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
    if (this.metodopago === 'qr' && this.qrData) {
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
  
  // Función para cerrar el modal y redirigir al inicio
  closeModalAndRedirect() {
  // Cierra el modal Efectivo si está abierto
  const modalEfectivo = document.getElementById('staticBackdropefectivo');
  if (modalEfectivo) {
    const bsModal = new bootstrap.Modal(modalEfectivo);
    bsModal.hide();
  }
  // Redirige al usuario a la página de inicio y recarga el sitio
  window.location.href = '/';
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
        window.location.href = '/';
  }

  generatePDF() {
    let docDefinition = {
        content: [
            {
                table: {
                    widths: ['33.3333%', '33.3333%', '16.6667%', '33.3333%'],
                    body: [
                        [{ text: 'TORDO TRAVEL', colSpan: 4, alignment: 'center', bold: true }, {}, {}, {}],
                        [{}, {}, {}, {}], // Fila vacía
                        [{ text: 'Dirección:', bold: true }, 'Mariano Mendez 2135', { text: 'Nit:', bold: true }, '4947021011'],
                        [{ text: 'Actividad Económica:', bold: true }, 'Sistema de Ventas Online', { text: 'Factura Nro:', bold: true }, ''],
                        [{ text: 'Emisión:', bold: true }, 'Cochabamba', { text: 'Fecha:', bold: true }, this.flota.fecharegistro],
                        [{ text: 'Nombre Pasajero:', bold: true }, this.nombre + ' ' + this.apellidos, { text: 'Nit:', bold: true }, this.nit],
                        [{ text: 'Fecha:', bold: true }, this.flota.fecharegistro, { text: 'Emitido por:', bold: true }, 'TORDO TRAVEL'],
                        [{ text: 'Ticket:', bold: true }, '', '', ''], // ColSpan para Ticket
                        [{}, {}, {}, {}], // Fila vacía
                        [{ text: 'Nombre Pasajero:', bold: true }, this.nombre + ' ' + this.apellidos, { text: 'Asiento:', bold: true }, this.flota.asiento],
                        [{ text: 'Hora:', bold: true }, this.flota.hora, { text: 'Flota:', bold: true }, this.flota.placa],
                        [{ text: 'Origen:', bold: true }, this.flota.origen, { text: 'Destino:', bold: true }, this.flota.destino],
                        [{ text: 'Precio Unit:', bold: true }, this.flota.precio + ' ' +'Bs', { text: 'Precio Total:', bold: true }, this.flota.precio +' ' + 'Bs'],
                    ]
                },
                layout: 'noBorders'
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            }
        }
    };

    pdfMake.createPdf(docDefinition).download('Factura_TordoTravel.pdf');
}

  enviarPorWhatsapp() {
    const telefono = '+59170776212'; // El número de teléfono al que deseas enviar el mensaje
    const mensaje = `Hola, aquí están los detalles de la compra: 
    *Asiento* ${this.flota.asiento},
    *Nombre:* ${this.nombre} ${this.apellidos},
    *Fecha:* ${this.flota.fecharegistro}, *Hora:* ${this.flota.hora}, *Origen:* ${this.flota.origen}, *Destino:* ${this.flota.destino}, *Precio:* ${this.flota.precio} Bs,
    *Placa Vehiculo:* ${this.flota.placa},
    *Tipo:* ${this.flota.tipo}`;
    
    const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');
  }

  onButtonClick() {
    this.generatePDF();
    this.enviarPorWhatsapp();
  }

  generateQROnEfectivo() {
    if (this.metodopago === 'efectivo') {
      // Llama al servicio para generar el código QR
      this.qrService.createqrbe(this.qrData).subscribe(
        (response) => {
          console.log('Código QR generado:', response);

          // Modifica la asignación para incluir 'data:image/png;base64,'
          this.qrResponse = {
            objeto: {
              imagenQr: 'data:image/png;base64,' + response.objeto.imagenQr
            }
          };

           // Establece qrGenerated en true después de generar el código QR
        this.qrGenerated = true;

          // Abre el modal "Efectivo" y muestra el QR generado
          const modalEfectivo = document.getElementById('staticBackdropefectivo');
          if (modalEfectivo) {
            const bsModal = new bootstrap.Modal(modalEfectivo);
            bsModal.show();
          }

          // Deshabilita el botón "Confirmar" después de abrir el modal
          this.botonConfirmarHabilitado = false;
        },
        (error) => {
          console.error('Error al generar el código QR:', error);
          // Maneja el error de acuerdo a tus necesidades
        }
      );
    }
    
  }

  generateQR() {
    // Llama a tu servicio para generar el código QR y maneja la respuesta
    this.qrService.createqrbe(this.qrData).subscribe(
      (response) => {
        console.log('Código QR generado:', response);

        // Modifica la asignación para incluir 'data:image/png;base64,'
        this.qrResponse = {
          objeto: {
            imagenQr: 'data:image/png;base64,' + response.objeto.imagenQr
          }
        };

        // Establece qrGenerated en true después de generar el código QR
        this.qrGenerated = true;


        this.registroExitoso = false;
        // Oculta la alerta después de cargar la imagen
      this.hideQRAlert();

        // Abre el modal si es necesario
        this.openModal();
      },
      (error) => {
        console.error('Error al generar el código QR:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  
}

hideQRAlert() {
  // Oculta el mensaje de registro exitoso
  if (this.registroExitosoMessage) {
    this.registroExitosoMessage.nativeElement.style.display = 'none';
  }
}


cerraryvolver() {
  window.location.reload();
}

openValidarQRModal() {
  const modalElement = document.getElementById('validarQRModal');
  const aliasElement = document.getElementById('aliasValue');

  if (modalElement && aliasElement && this.qrData && this.qrData.alias) {
    // Actualizar el contenido del elemento con el valor del alias
    aliasElement.innerText = this.qrData.alias;

    // Mostrar el modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  } else {
    console.error('No se encontró el modal o el elemento del alias, o no hay datos de alias disponibles.');
  }

}

enviarValidacionQR() {
  const datosValidacion: validaQrINterface = {

    alias: this.qrData.alias
    /*
    objeto: {
      imagenQr: this.qrResponse.objeto.imagenQr, // Asumiendo que esto viene de tu respuesta QR
      // Completa las demás propiedades según tus datos
      estadoActual: '',
      fechaProcesamiento: '',
      fechaRegistro: '',
      numeroOrdenOriginante: null,
      idQr: '',
      moneda: '',
      cuentaCliente: null,
      nombreCliente: null,
      documentoCliente: null
    }
    */
   
  };


  /*
  this.qrService.validarqrbe(datosValidacion).subscribe(
    (response) => {
      // Actualiza el segundo alerta con la respuesta
      const resultadoElement = document.getElementById('validationResult');
      if (resultadoElement) {
        resultadoElement.innerHTML = `Resultado: ${JSON.stringify(response)}`;
      }
      // Comprueba si el estado es PAGADO
     
    },
    (error) => {
      console.error('Error en la validación:', error);
      // Aquí puedes manejar el error como quieras. Por ejemplo, podrías mostrar un mensaje al usuario:
      alert('Ocurrió un error al validar el QR. Por favor, inténtalo de nuevo.');
    }
  );

*/
this.qrService.validarqrbe(datosValidacion).subscribe(
  (response: any) => {
    console.log('Respuesta del servicio de validación QR:', response);

    // Almacena el resultado en la propiedad
    this.resultadoValidacionQR = response.estadoActual || 'Sin respuesta';

    // Comprueba si el estado es "PAGADO"
    if (response.estadoActual === 'PAGADO') {
      // Cierra el modal de validación de QR
      this.cerrarModal('validarQRModal');

      // Abre el modal de "Estado de Pago"
      this.abrirModalEstadoPagado();
    }
  },
  (error) => {
    console.error('Error en la validación:', error);
  }
);
}

cerrarModal(idModal: string) {
// Lógica para cerrar un modal
const modalElement = document.getElementById(idModal);
if (modalElement) {
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance?.hide();
}
}

abrirModalEstadoPagado() {
// Lógica para abrir el modal de "Estado de Pago"
const modalElement = document.getElementById('modalEstadoPagado');
if (modalElement) {
  const modalEstadoPagado = new bootstrap.Modal(modalElement);
  modalEstadoPagado.show();
} else {
  console.error('El modal con ID "modalEstadoPagado" no se encontró.');
}
}

onValidarQRClick() {
  this.showSpinner = true; // Muestra el spinner

  // Espera 5 segundos antes de ejecutar enviarValidacionQR
  setTimeout(() => {
    this.enviarValidacionQR();
    this.showSpinner = false; // Oculta el spinner después de ejecutar la función
  }, 5000);
}


verificarCamposLlenos() {
  if (
    !this.nombre ||
    !this.apellidos ||
    !this.fechanacimiento ||
    !this.nit ||
    !this.telefono ||
    !this.ci ||
    !this.email
  ) {
    // Al menos uno de los campos requeridos está vacío
    alert('Por favor, complete todos los campos requeridos.');
  } else {
    // Todos los campos requeridos están llenos, continuar con la lógica deseada
    this.openModal(); // O cualquier otra acción que desees realizar
  }
}



  realizarTransaccion() {
    // Tu lógica de transacción aquí...

    // Cambia el estado a PAGADO
    this.estado = 'PAGADO';
    this.abrirModalEstadoPagado();
  }  


}

