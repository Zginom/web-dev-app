import { Component, Input, OnInit } from '@angular/core';
import { ModalBase } from "../../../../shared/components/modal/modal-base";
import { Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WorkerModel } from "./worker-model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-add-worker',
    templateUrl: './add-worker.component.html'
})
export class AddWorkerComponent extends ModalBase implements OnInit {

    @Input() itemAction: Subject<any>;
    workersForm: FormGroup;

    constructor(modalService: NgbModal) {
        super(modalService);
    }

    ngOnInit(): void {
        this.workersForm = new FormGroup({
            name: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required)
        });
    }

    go(data: WorkerModel) {
        this.itemAction.next({ type: 'add', data });
        this.workersForm.reset();
    }

}
