import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static password(control: AbstractControl): ValidationErrors {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/.test(control.value)) {
            return { password: true };
        }
    }

    static equalRequired(group: FormGroup): ValidationErrors {

        const values = Object.values(group.value);

        if (!values.every((value) => values[0] === value)) {
            return { equal: true };
        }

    };

    static atLeastOneShouldBeSelected(group: FormGroup): ValidationErrors {

        if (Object.values(group.value).some(value => !!value)) {
            return;
        }

        return { atLeastOne: true };
    };

    static passedDateRequired(control: AbstractControl): ValidationErrors {

        if (control.value && Date.parse(Object.values(control.value).join('-')) < Date.now()) return;

        return {
            passedDate: true
        }

    }
}