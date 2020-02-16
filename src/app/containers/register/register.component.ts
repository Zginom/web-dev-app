import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/services/custom-validators';
import { RegisterService } from './services/register.service';
import { CustomServerValidatorsService } from '../../shared/services/custom-server-validators.service';
import { Api } from '../../utils/api';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [
        RegisterService
    ]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private registerService: RegisterService,
        private customrServerValidator: CustomServerValidatorsService) {

    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.email
            ],
                this.customrServerValidator.doesItExist.bind(this.customrServerValidator, Api.DOES_IT_EXIST, 'username')),
            passwordGroup: new FormGroup({
                password: new FormControl('', [
                    Validators.required,
                    CustomValidators.password
                ]),
                confirmPassword: new FormControl('')
            }, CustomValidators.equalRequired),
            birthDate: new FormControl('', [
                Validators.required,
                CustomValidators.passedDateRequired
            ]),
            hobbies: new FormGroup({
                tv: new FormControl(''),
                music: new FormControl(''),
                sport: new FormControl(''),
                travel: new FormControl(''),
            }, CustomValidators.atLeastOneShouldBeSelected)
        });
    }

    sendForm(ngForm) {
        if (this.registerForm.valid) {
            this.registerService
                .register({
                    ...this.registerForm.value,
                    password: this.registerForm.value.passwordGroup.password,
                    birthDate: Date.parse(Object.values(this.registerForm.value.birthDate).join('-')).toString()
                })
                .subscribe((resp) => {
                    alert(JSON.stringify("Account created", null, 4));
                    ngForm.resetForm();
                    this.registerForm.reset();
                });
        } else {
            console.error('form invalid');
        }
    }

}
