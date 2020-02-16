import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthComponent } from "./auth.component";
import { AuthService } from "./services/auth.service";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../../../shared/services/state.service";
import { DebugElement } from "@angular/core";
import { of } from "rxjs";
import { Api } from "../../../../utils/api";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe('auth component', () => {

    let stateService: StateService,
        fixture: ComponentFixture<AuthComponent>,
        instance: AuthComponent,
        element: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthComponent
            ],
            imports: [
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthService,
                StateService
            ]
        });

        fixture = TestBed.createComponent(AuthComponent);
        instance = fixture.componentInstance;
        element = fixture.debugElement;
        stateService = TestBed.get(StateService);

    });

    describe('login form', () => {

        it('should be display after detect changes', () => {
            fixture.detectChanges();
            const loginForm = element.query(By.css('form'));
            expect(loginForm).toBeTruthy();
        });

        it('should not be display after success login', () => {
            spyOn(instance.authService, 'logIn').and.returnValue(of({ ok: true }));
            instance.logIn({});
            expect(instance.authService.logIn).toHaveBeenCalled();

            fixture.detectChanges();
            const loginForm = element.query(By.css('form'));
            expect(loginForm).toBeFalsy();
        });

    });

    describe('stateService.isLogged ', () => {

        let req: TestRequest;

        beforeEach(() => {
            const http = TestBed.get(HttpTestingController);
            instance.logIn({});
            req = http.expectOne(Api.LOGIN_END_POINT);
        });

        it('should be true', () => {
            req.flush({ ok: true });
            expect(stateService.access.getValue()).toBeTruthy();
        });

    });

});
