import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBase } from '../../../../../shared/components/modal/modal-base';
import { Subject } from 'rxjs';
import { ItemModel } from '../../item-model';
import { CustomServerValidatorsService } from "../../../../../shared/services/custom-server-validators.service";
import { Api } from 'src/app/utils/api';


@Component({
    selector: 'modal-add',
    templateUrl: './modal-add-item.component.html',
    providers: [
        CustomServerValidatorsService
    ]
})

export class ModalAddItemComponent extends ModalBase {
    addItemForm: FormGroup;
    uploadUrl: string;
    @Input() newItem: Subject<any>;

    constructor(modalService: NgbModal, customServerValidators: CustomServerValidatorsService) {
        super(modalService);
        this.addItemForm = new FormGroup({
            title: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ]), customServerValidators.doesItExist.bind(customServerValidators, Api.DOES_IT_EXIST, 'title')),
            imgSrc: new FormControl(''),
            price: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[1-9]+[0-9]*')
            ])),
            category: new FormControl('', Validators.required)
        });
        this.uploadUrl = Api.UPLOAD_END_POINT;
    }

    go(formValue: ItemModel) {
        this.newItem.next({ type: 'add', data: formValue });
        this.addItemForm.reset();
    }

}
