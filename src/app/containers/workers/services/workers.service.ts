import { Injectable } from '@angular/core';
import { HttpServiceModel, HttpResponseModel } from "../../../shared/services/http.interface";
import { Observable } from "rxjs";
import { Api } from "../../../utils/api";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WorkersService implements HttpServiceModel {

    constructor(private http: HttpClient) { }

    fetch(filters?: any): Observable<any> {
        return this.http
            .get(Api.WORKERS_END_POINT)
            .pipe(
                map((resp: HttpResponseModel) => resp.data)
            )
    }

    add(item: any): Observable<any> {
        return this.http.post(Api.WORKERS_END_POINT, item);
    }

    update(item: any): Observable<any> {
        return this.http
            .put(`${Api.WORKERS_END_POINT}/${item.id}`, item);
    }

    remove(id): Observable<any> {
        return this.http.delete(Api.WORKERS_END_POINT + "/" + id);
    }

    get(id): Observable<any> {
        throw new Error("Method not implemented.");
    }

}
