import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl: string = environment.baseUrl;
  private token: string = environment.token;


  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Empleado[]> {
    let headers = this.createAuthorizationHeader();
    return this.httpClient.get<Empleado[]>(this.baseUrl + 'empleados/list', { headers: headers }).pipe(catchError(this.errorHandler));
  }

  public detail(id: number): Observable<Empleado> {
    let headers = this.createAuthorizationHeader();
    return this.httpClient.get<Empleado>(this.baseUrl + 'empleados/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
  }


  public save(empleado: Empleado): Observable<any> {
    let headers = this.createAuthorizationHeader();
    return this.httpClient.post(this.baseUrl + 'empleados/create', empleado, { headers: headers }).pipe(catchError(this.errorHandler));

  }

  public update(id: number, empleado: Empleado): Observable<any> {
    let headers = this.createAuthorizationHeader();
    return this.httpClient.put<any>(this.baseUrl + 'empleados/update/' + `${id}`, empleado, { headers: headers }).pipe(catchError(this.errorHandler));
  }

  public delete(id: number): Observable<any> {
    let headers = this.createAuthorizationHeader();
    return this.httpClient.delete<Empleado>(this.baseUrl + 'empleados/delete/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
  }

  createAuthorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    return headers;
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.error);
  }
}
