import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-validator',
    templateUrl: './validator.component.html',
    styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

    @Input() errors: Object;

    constructor() {
    }

    ngOnInit() {
    }

}
