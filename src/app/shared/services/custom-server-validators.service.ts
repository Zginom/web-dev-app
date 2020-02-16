import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { timer } from 'rxjs';
import { switchMapTo, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomServerValidatorsService {
    constructor(private http: HttpClient) {
    }

    doesItExist(url, key, control) {
        return timer(500).pipe(switchMapTo(
            this.http
                .get(url, { params: { [key]: control.value } })
                .pipe(
                    map((resp: any) => {
                        if (!resp.ok) {
                            return { [resp.error]: true };
                        }
                    })
                )
        ))

    }
}
