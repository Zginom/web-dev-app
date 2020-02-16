import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Api } from "../../../../../utils/api";

describe('Auth service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService
            ]
        });
    });

    it('should return true when login is ok', inject([AuthService], (authService) => {
        const http = TestBed.get(HttpTestingController);

        authService
            .logIn({})
            .subscribe(data => {
                expect(data.ok).toBeTruthy()
            });

        const req = http.expectOne(Api.LOGIN_END_POINT);
        expect(req.request.method).toEqual('POST');
        req.flush({ ok: true });
        http.verify();
    }));

});
