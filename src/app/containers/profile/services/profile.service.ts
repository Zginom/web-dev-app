import { Injectable } from '@angular/core';
import { HttpServiceModel, HttpResponseModel } from '../../../shared/services/http.interface';
import { Observable } from 'rxjs';
import { Api } from '../../../utils/api';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService implements HttpServiceModel {

  constructor(private http: HttpClient) { }

  fetch(filters?: any): Observable<any> {
    return this.http
      .get(Api.PROFILE_END_POINT)
      .pipe(
        map((resp: HttpResponseModel) => resp.data)
      )
  }

  add(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }

  update(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }

  remove(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }

  get(id): Observable<any> {
    throw new Error("Method not implemented.");
  }

}
