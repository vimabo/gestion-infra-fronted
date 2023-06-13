import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Grupo } from '../models/grupo';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class GrupoService {

    private baseUrl: string = environment.baseUrl;
    //private token: string = environment.token;
    token = '';


    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

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
    
        this.tokenService.token('Boca').subscribe(
          data => {
            this.token = data.token;
          },
          err => {
            console.log(err);
          }
        );
        headers = headers.append('Authorization', this.token);
        return headers;
      }

    errorHandler(error: HttpErrorResponse) {
        return observableThrowError(error.error);
    }
}
