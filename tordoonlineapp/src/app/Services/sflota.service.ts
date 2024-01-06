import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registrarflotaInter } from '../Interfaz/flota';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';



//SERVICIO ES EL QUE INTERACTUA CON EL BACKEND

@Injectable({
  providedIn: 'root'
})
export class SflotaService {


  //entorno para llamar

  private Myappurl: string = environment.endpoint;
  private Myapiurl: string = 'api/Flta';
  private Myapiurlb: string = 'api/Flta/buscar';

  //constructor
  constructor(private http: HttpClient) { }

//funcion obtejer flota

getflota(): Observable<registrarflotaInter[]> {
     
  return this.http.get<registrarflotaInter[]>(this.Myappurl+this.Myapiurl);

 }
addflota  (regd: registrarflotaInter): Observable<registrarflotaInter>{

  return this.http.post<registrarflotaInter>(`${this.Myappurl}${this.Myapiurl}`,regd);

}

buscarFlotaPorOrigenYDestino(origen: string, destino: string): Observable<registrarflotaInter[]> {
  const url = `${this.Myappurl}${this.Myapiurlb}/${origen}/${destino}`;
  
  return this.http.get<registrarflotaInter[]>(url).pipe(
    catchError((error) => {
      console.error('Error al buscar flota:', error);
      // Muestra una alerta con el mensaje deseado cuando no se encuentran resultados
      alert('No se encontraron resultados');
      // Lanza el error para que se maneje en el componente, si es necesario
      return throwError(error);
    })
  );
}

buscarFlotaPorOrigenDestinoYFecha(origen: string, destino: string, fechaRegistro: string): Observable<registrarflotaInter[]> {
  const url = `${this.Myappurl}/${this.Myapiurlb}/buscar/${origen}/${destino}/${fechaRegistro.substring(0, 10)}`;

  return this.http.get<registrarflotaInter[]>(url).pipe(
    catchError((error) => {
      console.error('Error al buscar flota:', error);
      // Muestra una alerta con el mensaje deseado cuando no se encuentran resultados
      alert('No se encontraron resultados');
      // Lanza el error para que se maneje en el componente, si es necesario
      return throwError(error);
    })
  );
}



buscarFlotaPorFecha(origen: string, destino: string, fecha: Date): Observable<registrarflotaInter[]> {
  // Formatea la fecha como "yyyy-MM-dd" sin hora y minutos
  const fechaSinHora = fecha.toISOString().split('T')[0];

  // Asegúrate de que no haya barras diagonales adicionales en Myappurl y Myapiurl
  const baseUrl = this.removeTrailingSlash(this.Myappurl);
  const apiBaseUrl = this.removeTrailingSlash(this.Myapiurl);

  // Construye la URL de la solicitud GET utilizando plantillas de cadena
  const url = `${baseUrl}/api/Flta/buscar/${origen}/${destino}/${fechaSinHora}`;

  return this.http.get<any>(url).pipe(
    catchError((error) => {
      if (error.status === 404 && error.error && error.error.mensaje === "No se encontraron resultados") {
        return throwError(error.error.mensaje);
      } else {
        console.error('Error al buscar flota Fecha:', error);
        return throwError('Error al realizar la búsqueda.'); // Otra alternativa de mensaje de error genérico
      }
    })
  );
}

// Función para eliminar la barra diagonal al final de una cadena
private removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, ''); // Reemplaza una o más barras diagonales al final con una cadena vacía
}






buscarFlota(origen: string, destino: string): Observable<any> {
  const url = `${this.Myappurl}${this.Myapiurlb}/${origen}/${destino}`;
  
  return this.http.get<any>(url).pipe(
    catchError((error) => {
      console.error('Error al buscar flota:', error);
      return throwError(error);
    })
  );
}
}
 