import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroUsuarioTicketInter } from '../Interfaz/usuario';
import { VentaPasajeticketInter } from '../Interfaz/usuario';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SusuarioService {
//entorno para llamar

private Myappurl: string = environment.endpoint;
private Myapiurl: string = 'api/Pasj';
private Myapigvurl: string = 'api/Pasj/ventaticket';
private Myapipvurl: string = 'api/Pasj/pventaticket';
private Myapigfurl: string = 'api/Pasj/byplaca/';

//constructor
constructor(private http: HttpClient) { }

//funcion obtener Pasajero

getpasajeros(): Observable<RegistroUsuarioTicketInter[]> {
   
return this.http.get<RegistroUsuarioTicketInter[]>(this.Myappurl+this.Myapiurl);

}

//Incorporar Registros Pasajero

addpasajeroti  (regpt: RegistroUsuarioTicketInter): Observable<RegistroUsuarioTicketInter>{

return this.http.post<RegistroUsuarioTicketInter>(`${this.Myappurl}${this.Myapiurl}`,regpt);

}

//funcion obtener lista pasajeros

getpasajerosventa(): Observable<VentaPasajeticketInter[]> {
   
return this.http.get<VentaPasajeticketInter[]>(this.Myappurl+this.Myapigvurl);

}


//Incorporar Registros Venta Pasajero

postaddpasajero  (regpt: VentaPasajeticketInter): Observable<VentaPasajeticketInter>{

return this.http.post<VentaPasajeticketInter>(`${this.Myappurl}${this.Myapipvurl}`,regpt);

}

//getflota

getpasajerosflota(placa: string): Observable<VentaPasajeticketInter[]> {
return this.http.get<VentaPasajeticketInter[]>(`${this.Myappurl}${this.Myapigfurl}${placa}`);
}




}
