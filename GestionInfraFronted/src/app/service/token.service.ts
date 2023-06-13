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
export class TokenService {

    private baseUrl: string = environment.baseUrl;


    constructor(private httpClient: HttpClient) { }
   
    public token(user: String): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        const body = {id : user};
        return this.httpClient.post(this.baseUrl + 'auth/login', body,{ headers: headers }).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return observableThrowError(error.error);
    }
}
