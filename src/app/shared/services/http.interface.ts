import { Observable } from 'rxjs';

export interface HttpServiceModel {
    fetch(filters?: { [key: string]: any }): Observable<HttpResponseModel>;
    get(id: string): Observable<any>;
    add(item): Observable<HttpResponseModel>;
    update(item): Observable<HttpResponseModel>;
    remove(id: string): Observable<HttpResponseModel>;
}

export interface HttpResponseModel {
    ok: boolean;
    data: any[];
    total: number;
    info: string;
    error: string;
    token: string;
}
