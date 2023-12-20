import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envgeneraqr, environment } from 'src/environments/environment';
import { generaQr,validaQrINterface } from '../Interfaz/qr';
import { VentaPasajeticketInter } from '../Interfaz/usuario';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class QrService {

//private Myappurl: string = envgeneraqr.endpointgeneraqr;
private Myappurl: string = environment.endpoint;
private Myapiurl: string = 'api/v1/generaQr';
//private Myapiurls: string = 'api/APIQR/generaQr';   //--clean
private Myapiurls: string = 'api/APIQR/GenerarTokenYQr';
private Myapiurvqr: string = 'api/APIQR/validacionQryRespuesta'; 


constructor(private http: HttpClient) { }


//funcion generar qr


/*createqr  (createqr:generaQr ): Observable<generaQr>{

  return this.http.post<generaQr>(`${this.Myappurl}${this.Myapiurl}`,createqr);
  
  }


}
*/

createqr(createqr: generaQr): Observable<generaQr> {
  // Define los encabezados de la solicitud HTTP
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'apikeyServicio': 'ad3abc8fda3e938efbd6601dd0bd0e7883eeec4d27da85e1',
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJOb21icmUiOiJKVUFOQSBKVUxJQU5BIFZBU1FVRVogVklMTEFSUk9FTCIsInN1YiI6IkpVQU5BSiIsIlRpcG8iOiJFTVBSRVNBIiwiU3UvdGlwbyI6bnVsbCwiSWRVc3VhcmlvIjoyOTMwNiwiT2JzZXJ2YWRvIjpmYWxzZSwiTWVudSI6W3sidGl0dWxvIjoiQWRtaW5pc3RyYWNpw7NuIiwib3JkZW4iOjEsImxpc3RhUGVybWlzbyI6W3siaWRQZXJtaXNvIjoxNSwibm9tYnJlIjoiVXN1YXJpb3MiLCJ2YWxvciI6Ii91c3VhcmlvcyIsIm9yZGVuIjoxLCJfX2hpam9zIjpudWxsfV19LHsidGl0dWxvIjoiVHJhbnNmZXJlbmNpYXMiLCJvcmRlbiI6MCwibGlzdGFQZXJtaXNvIjpbeyJpZFBlcm1pc28iOjE3LCJub21icmUiOiJUcmFuc2FjY2lvbmVzIiwidmFsb3IiOiIvdHJhbnNhY2Npb25lcyIsIm9yZGVuIjoxLCJfX2hpam9zIjpudWxsfSx7ImlkUGVybWlzbyI6MjMsIm5vbWJyZSI6IlJlcG9ydGVzIiwidmFsb3IiOiIvcmVwb3J0ZXMiLCJvcmRlbiI6MSwiX19oaWpvcyI6bnVsbH1dfSx7InRpdHVsbyI6IkVudGlkYWRlcyIsIm9yZGVuIjozLCJsaXN0YVBlcm1pc28iOlt7ImlkUGVybWlzbyI6MjEsIm5vbWJyZSI6IlNlcnZpY2lvcyIsInZhbG9yIjoiL3NlcnZpY2lvcyIsIm9yZGVuIjoxLCJfX2hpam9zIjpudWxsfSx7ImlkUGVybWlzbyI6OTcsIm5vbWJyZSI6IkVzdHJ1Y3R1cmEiLCJ2YWxvciI6Ii9lc3RydWN0dXJhIiwib3JkZW4iOjIsIl9faGlqb3MiOm51bGx9XX1dLCJleHAiOjE3MDI2MTc2MzgsImlhdCI6MTcwMjYxNDAzOCwiRW50aWRhZCI6MTY5NTB9.LLl2dJVCRtHJxT-jgVdpbYTGjVGV4UY1YS21wEYwclUrpJt0EFq1mVvLXurKSFSOgoldgzwWv4vcb4x5cJQi9g'
  });

  // Realiza la solicitud HTTP con los encabezados
  return this.http.post<generaQr>(`${this.Myappurl}${this.Myapiurl}`, createqr, { headers });
}


createqrbe(createqr: generaQr): Observable<generaQr> {
  // Define los encabezados de la solicitud HTTP
  const headers = new HttpHeaders({
    //'Content-Type': 'application/json',
    //'apikeyServicio': 'ad3abc8fda3e938efbd6601dd0bd0e7883eeec4d27da85e1',
    //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJOb21icmUiOiJKVUFOQSBKVUxJQU5BIFZBU1FVRVogVklMTEFSUk9FTCIsInN1YiI6IkpVQU5BSiIsIlRpcG8iOiJFTVBSRVNBIiwiU3VidGlwbyI6bnVsbCwiSWRVc3VhcmlvIjoyOTMwNiwiT2JzZXJ2YWRvIjpmYWxzZSwiTWVudSI6W3sidGl0dWxvIjoiQWRtaW5pc3RyYWNpw7NuIiwib3JkZW4iOjEsImxpc3RhUGVybWlzbyI6W3siaWRQZXJtaXNvIjoxNSwibm9tYnJlIjoiVXN1YXJpb3MiLCJ2YWxvciI6Ii91c3VhcmlvcyIsIm9yZGVuIjoxLCJfX2hpam9zIjpudWxsfV19LHsidGl0dWxvIjoiVHJhbnNmZXJlbmNpYXMiLCJvcmRlbiI6MCwibGlzdGFQZXJtaXNvIjpbeyJpZFBlcm1pc28iOjE3LCJub21icmUiOiJUcmFuc2FjY2lvbmVzIiwidmFsb3IiOiIvdHJhbnNhY2Npb25lcyIsIm9yZGVuIjoxLCJfX2hpam9zIjpudWxsfSx7ImlkUGVybWlzbyI6MjMsIm5vbWJyZSI6IlJlcG9ydGVzIiwidmFsb3IiOiIvcmVwb3J0ZXMiLCJvcmRlbiI6MSwiX19oaWpvcyI6bnVsbH1dfSx7InRpdHVsbyI6IkVudGlkYWRlcyIsIm9yZGVuIjozLCJsaXN0YVBlcm1pc28iOlt7ImlkUGVybWlzbyI6MjEsIm5vbWJyZSI6IlNlcnZpY2lvcyIsInZhbG9yIjoiL3NlcnZpY2lvcyIsIm9yZGVuIjoxLCJfX2hpam9zIjpudWxsfSx7ImlkUGVybWlzbyI6OTcsIm5vbWJyZSI6IkVzdHJ1Y3R1cmEiLCJ2YWxvciI6Ii9lc3RydWN0dXJhIiwib3JkZW4iOjIsIl9faGlqb3MiOm51bGx9XX1dLCJleHAiOjE3MDI3NTc5OTMsImlhdCI6MTcwMjc1NDM5MywiRW50aWRhZCI6MTY5NTB9.r1SYw9--GHPmazLV33aTGgASAeBO2zV18YDfmxx8jA_aNtcc8KHIjGLVoI4Is125VmYc1lPb1M_smKrorVWyJw'
  });

  // Realiza la solicitud HTTP con los encabezados
  return this.http.post<generaQr>(`${this.Myappurl}${this.Myapiurls}`, createqr, { headers });
}

/*
validarqrbe(validarqr: validaQrINterface): Observable<validaQrINterface> {
  // Define los encabezados de la solicitud HTTP

  // Antes de realizar la solicitud POST, configura el encabezado Content-Type
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  
  // Realiza la solicitud HTTP con los encabezados
  return this.http.post<validaQrINterface>(`${this.Myappurl}${this.Myapiurvqr}`, validarqr, { headers });
}
*/

/*
validarqrbe(validarqr: validaQrINterface): Observable<validaQrINterface> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(`${this.Myappurl}${this.Myapiurvqr}`, validarqr, { headers }).pipe(
    map((response: any) => {
      // Parsea la respuesta JSON antes de devolverla
      const jsonResponse = JSON.parse(response);
      return jsonResponse;
    }),
    catchError((error) => {
      console.error('Error al validar el QR:', error);
      return throwError(error); // Puedes manejar el error de acuerdo a tus necesidades
    })
  );
}

*/
validarqrbe(validarqr: validaQrINterface): Observable<validaQrINterface> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  console.log('Enviando al backend:', validarqr);

  return this.http.post(`${this.Myappurl}${this.Myapiurvqr}`, validarqr, { headers }).pipe(
    map((response: any) => {
      // Parsea la respuesta JSON antes de devolverla
      //const jsonResponse = JSON.parse(response);
      //return jsonResponse;
      return response;
    }),
    catchError((error) => {
      console.error('Error al validar el QR:', error);
      return throwError(error); // Puedes manejar el error de acuerdo a tus necesidades
    })
  );
}


}