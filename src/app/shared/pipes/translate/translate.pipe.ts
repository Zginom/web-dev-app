import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from '../../services/state.service';
import { DictService } from '../../services/dict.service';

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {

    lang;
    dict;

    constructor(private stateService: StateService,
        private dictService: DictService) {
        this.lang = stateService.lang;
        this.dict = dictService.dict;
    }

    transform(text: any): any {
        if (text
            && this.lang
            && this.dict[this.lang]
            && this.dict[this.lang][text]) {
            return this.dict[this.lang][text];
        } else {
            return text;
        }
    }

}
