import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Orden } from '../models/orden';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class OrdenService {

    private baseUrl: string = environment.baseUrl;
    //private token: string = environment.token;
    token = '';


    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

    public lista(): Observable<Orden[]> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Orden[]>(this.baseUrl + 'ordenes/list', { headers: headers }).pipe(catchError(this.errorHandler));
    }

    public save(equipo: Orden): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.post(this.baseUrl + 'ordenes/create', equipo, { headers: headers }).pipe(catchError(this.errorHandler));

    }

    public detail(id: number): Observable<Orden> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.get<Orden>(this.baseUrl + 'ordenes/' + `${id}`, { headers: headers }).pipe(catchError(this.errorHandler));
    }


    public update(id: number, empleado: Orden): Observable<any> {
        let headers = this.createAuthorizationHeader();
        return this.httpClient.put<any>(this.baseUrl + 'ordenes/update/' + `${id}`, empleado, { headers: headers }).pipe(catchError(this.errorHandler));
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
