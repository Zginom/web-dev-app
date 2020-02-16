import { Component, Input } from '@angular/core';
import { Subject } from "rxjs";
import { DataGridConfig } from '../data-grid-config';

@Component({
    selector: '[data-grid-row]',
    templateUrl: './data-grid-row.component.html'
})
export class DataGridRowComponent {
    @Input() model: any;
    @Input() config: DataGridConfig;
    @Input() itemAction: Subject<any>;

    constructor() { }

    action(type, data) {
        this.itemAction.next({ type, data });
    }
}
