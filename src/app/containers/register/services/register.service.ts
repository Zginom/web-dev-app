import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Api } from "../../../utils/api";

@Injectable()
export class RegisterService {

    constructor(private http: HttpClient) {
    }

    register(user) {
        return this.http.post(Api.REGISTER_END_POINT, user);
    }

}
