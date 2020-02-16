import { Injectable } from '@angular/core';
import { AuthServiceModel, AuthDataModel } from './auth.service.interface';
import { Api } from '../../../../../utils/api';
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpResponseModel } from '../../../../../shared/services/http.interface';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthServiceModel {

    constructor(private http: HttpClient) {
    }

    logged(): Observable<any> {
        return this.http.get(Api.LOGGED_END_POINT);
    }

    logIn(formData: AuthDataModel): Observable<any> {
        return this.http.post(Api.LOGIN_END_POINT, formData);
    }

    logOut(): Observable<any> {
        return this.http.get(Api.LOGOUT_END_POINT);
    }

    canActivate(): Observable<any> | boolean {
        return this.logged()
            .pipe(
                map((resp: HttpResponseModel) => resp.ok),
                catchError(err => {
                    alert(JSON.stringify("Please log in first", null, 4));
                    return throwError(err);
                })
            )
    }

}
