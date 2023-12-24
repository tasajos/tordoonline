export interface generaQr {

    alias: string,
    callback: string,
    detalleGlosa: string,
    monto: number,
    moneda: string,
    fechaVencimiento: string,
    tipoSolicitud: string,
    unicoUso: string

    objeto: {
        imagenQr: string;
        estadoActual: string;
        // Otras propiedades si las hay
      };
}

export interface validaQrINterface {

  alias: string;
  /*
  objeto: {
  imagenQr: string;
    estadoActual: string;
    fechaProcesamiento: string; // Debes agregar esta propiedad
    fechaRegistro: string; // Debes agregar esta propiedad
    numeroOrdenOriginante: string | null; // Debes agregar esta propiedad
    idQr: string;
    moneda: string;
    cuentaCliente: string | null; // Debes agregar esta propiedad
    nombreCliente: string | null; // Debes agregar esta propiedad
    documentoCliente: string | null; //
};
*/
}
