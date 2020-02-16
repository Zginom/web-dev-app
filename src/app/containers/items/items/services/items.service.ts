import { Injectable } from '@angular/core';
import { Api } from '../../../../utils/api';
import { IItemModel } from '../item-model';
import { HttpResponseModel, HttpServiceModel } from '../../../../shared/services/http.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemsService implements HttpServiceModel {

    constructor(private http: HttpClient) {
    }

    fetch(params): Observable<HttpResponseModel> {
        return this.http.get<HttpResponseModel>(Api.ITEMS_END_POINT, { params });
    }

    get(id: string): Observable<IItemModel> {
        return this.http
            .get(`${Api.ITEMS_END_POINT}/${id}`)
            .pipe(
                map((resp: { data }) => resp.data)
            )
    }

    add(item: IItemModel): Observable<any> {
        return this.http.post(Api.ITEMS_END_POINT, item);
    }

    update(item: IItemModel): Observable<any> {
        return this.http.put(`${Api.ITEMS_END_POINT}/${item.id}`, item);
    }

    remove(id): Observable<any> {
        return this.http.delete(`${Api.ITEMS_END_POINT}/${id}`);
    }
}
