import { Component, Output, EventEmitter, Input } from '@angular/core';

import { ModalBase } from '../modal-base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-confirm',
    templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent extends ModalBase {
    @Input() question: string;
    @Input() btnText: string;
    @Output() outputAction = new EventEmitter<string>();

    constructor(modalService: NgbModal) {
        super(modalService);
    }

    go(result) {
        this.outputAction.emit();
    }
}
