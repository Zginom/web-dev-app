import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StateService } from '../../../../shared/services/state.service';
import { HttpResponseModel } from 'src/app/shared/services/http.interface';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['auth.component.scss']
})
export class AuthComponent {

    constructor(
        public authService: AuthService,
        public stateService: StateService) {
        this.logged();
    }

    logged() {
        this.authService
            .logged()
            .subscribe((resp: HttpResponseModel) => {
                this.stateService.serverInfo.next(resp.info);
                this.stateService.access.next(true);
            });
    }

    logIn(formValue) {
        this.authService
            .logIn(formValue)
            .subscribe(({ token, info }: HttpResponseModel) => {
                localStorage.setItem('token', token);
                this.stateService.serverInfo.next(info);
                this.stateService.access.next(true);
            });
    }

    logOut() {
        localStorage.removeItem('token');
        this.stateService.access.next(false);
        this.stateService.serverInfo.next('you are logged out');
        this.authService.logOut().subscribe();
    }

}
