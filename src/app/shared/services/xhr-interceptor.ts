import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { StateService } from "./state.service";
import { Injectable } from "@angular/core";
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CORSInterceptor implements HttpInterceptor {

    constructor(private stateService: StateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.stateService.unsaved.next(true);
        const token = localStorage.getItem('token');
        const opt = token ? { setHeaders: { 'x-access-token': token } } : {};
        const reqClone = req.clone({ ...opt, withCredentials: true });
        return next
            .handle(reqClone)
            .pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        this.stateService.unsaved.next(false);
                        //console.log('---> status:', evt.status);
                    }
                }),
                catchError(({ error }) => {
                    this.stateService.serverInfo.next(error);
                    return throwError(error);
                })
            )
    }
}
