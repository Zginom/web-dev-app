import { ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from "@angular/core";
import { NgForm, FormGroup } from '@angular/forms';

export interface ModalModel {
    open(content: TemplateRef<any>);
    checkAndSend?(form: NgForm | FormGroup): void;
    go(result: {}): void;
}

export class ModalBase implements ModalModel {

    openedModal: NgbModalRef;

    constructor(private modalService) { }

    async open(content) {
        this.openedModal = this.modalService.open(content);

        const value = await this.openedModal.result;

        try {
            this.go(value);
        } catch (error) {
            console.warn(this.getDismissReason(error));
        }
    }

    checkAndSend(form) {
        if (form.valid) {
            this.openedModal.close(form.value);
        } else {
            console.log('form invalid');
        }
    }

    go(result) {
        throw new Error('you should override go method');
    }

    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
