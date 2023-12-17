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
        // Otras propiedades si las hay
      };
}