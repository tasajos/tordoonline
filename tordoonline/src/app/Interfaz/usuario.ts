export interface Usuario {
}

export interface RegistroUsuarioTicketInter {
    id?: number,
    nombre: string,
    apellidos: string,
    ext: string,
    ci:number,
    fechanacimiento:Date,
    nit:number
    origen:string,
    destino:string,
    asiento:string,
    metodopago:string
}

export interface VentaPasajeticketInter {
    id?: number,
    asiento: string,
    fecha: string,
    nombre: string,
    apellidos: string,
    nit: string,
    ci:number,
    precio:number,
    tipo: string,
    telefono: string,
    email: string,
    origen: string,
    destino: string,
    hora: string,
    placa: string,
    fechanacimiento: Date | null;
    metodopago: string,
    preciocalculado?: number,
    estado?: string,
    
       
}

