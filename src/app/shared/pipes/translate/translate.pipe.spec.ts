import { TranslatePipe } from './translate.pipe';
import { StateService } from '../../services/state.service';
import { TestBed } from '@angular/core/testing';
import { DictService } from '../../services/dict.service';

describe('Pipe: Translate', () => {

    let pipe;
    let stateService;
    let dictService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StateService,
                DictService
            ]
        });
        stateService = TestBed.get(StateService);
        dictService = TestBed.get(DictService);
        pipe = new TranslatePipe(stateService, dictService);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return pl version', () => {
        pipe.lang = 'pl';
        const result = pipe.transform('required');
        expect(result).toBe(pipe.dict[pipe.lang].required);
    });

    it('should return de version', () => {
        pipe.lang = 'de';
        const result = pipe.transform('email');
        expect(result).toBe(pipe.dict[pipe.lang].email);
    });

});
