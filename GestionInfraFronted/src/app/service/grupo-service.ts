import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Grupo } from '../models/grupo';

@Injectable({
    providedIn: 'root'
})
export class GrupoService {

    private baseUrl: string = environment.baseUrl;
    private token: string = environment.token;


    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<Grupo[]> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Grupo[]>(this.baseUrl + 'grupos/list', { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public save(grupo: Grupo): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.post(this.baseUrl + 'grupos/create', grupo, { headers: headers }).pipe(catchError(this.errorHandler));

    }

    public detail(id: number): Observable<Grupo> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Grupo>(this.baseUrl + 'grupos/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
    }


    public update(id: number, grupo: Grupo): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.put<any>(this.baseUrl + 'grupos/update/' + `${id}`, grupo, { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public delete(id: number): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.delete<Grupo>(this.baseUrl + 'grupos/delete/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
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
