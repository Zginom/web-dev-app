import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthService } from './components/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../shared/services/state.service';
import { SetColorDirective } from "../../shared/directives/set-color.directive";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavComponent } from "./components/nav/nav.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AuthComponent,
                NavComponent,
                SetColorDirective
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthService,
                StateService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
    });

    it('should create root component', () => {
        const fixture = TestBed.createComponent(AppComponent);
        expect(fixture).toBeTruthy();
        fixture.detectChanges();
    });

});
