import { ValidatorComponent } from './validator.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MapToIterablePipe } from "../../pipes/array/array-pipes";
import { TranslatePipe } from "../../pipes/translate/translate.pipe";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { StateService } from "../../services/state.service";
import { DictService } from '../../services/dict.service';

describe('Component: Validator', () => {

    let fixture: ComponentFixture<ValidatorComponent>,
        instance: ValidatorComponent,
        element: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ValidatorComponent,
                MapToIterablePipe,
                TranslatePipe
            ],
            providers: [
                StateService,
                DictService
            ]
        });
    });

    it('should render proper number of errors according to errors object', () => {
        fixture = TestBed.createComponent(ValidatorComponent);
        instance = fixture.componentInstance;
        element = fixture.debugElement;

        instance.errors = { required: true, minLength: true, passedDate: true };
        fixture.detectChanges();
        const errors = element.queryAll(By.css('.badge-danger'));
        expect(errors.length).toBe(Object.keys(instance.errors).length);
    });

    it('should display de lang', () => {
        const stateService: StateService = TestBed.get(StateService);
        stateService.lang = 'de';
        fixture = TestBed.createComponent(ValidatorComponent);
        instance = fixture.componentInstance;
        element = fixture.debugElement;

        instance.errors = { required: true };
        fixture.detectChanges();
        const errors: DebugElement = element.query(By.css('.badge-danger'));
        expect(errors.nativeElement.innerText).toContain('erforderlich');
    });

    it('should display default lang', () => {
        const stateService: StateService = TestBed.get(StateService);
        stateService.lang = 'notFound';
        fixture = TestBed.createComponent(ValidatorComponent);
        instance = fixture.componentInstance;
        element = fixture.debugElement;

        instance.errors = { required: true };
        fixture.detectChanges();
        const errors: DebugElement = element.query(By.css('.badge-danger'));
        expect(errors.nativeElement.innerText).toContain('required');
    });
});
