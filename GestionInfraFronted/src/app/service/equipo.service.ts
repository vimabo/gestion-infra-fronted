import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Equipo } from '../models/equipo';

@Injectable({
    providedIn: 'root'
})
export class EquipoService {

    private baseUrl: string = environment.baseUrl;
    private token: string = environment.token;


    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<Equipo[]> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Equipo[]>(this.baseUrl + 'equipos/list', { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public listByOrden(id: number): Observable<Equipo[]> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<any>(this.baseUrl + 'equipos/getOrden/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public disponibles(): Observable<Equipo[]> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Equipo[]>(this.baseUrl + 'equipos/disponibles', { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public save(equipo: Equipo): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.post(this.baseUrl + 'equipos/create', equipo, { headers: headers }).pipe(catchError(this.errorHandler));

    }

    public detail(id: number): Observable<Equipo> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Equipo>(this.baseUrl + 'equipos/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
    }


    public update(id: number, empleado: Equipo): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.put<any>(this.baseUrl + 'equipos/update/' + `${id}`, empleado, { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public delete(id: number): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.delete<Equipo>(this.baseUrl + 'equipos/delete/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
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
