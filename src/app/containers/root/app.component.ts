import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { StateService } from 'src/app/shared/services/state.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    unsaved$: BehaviorSubject<boolean>;

    constructor(private stateService: StateService) {
        this.unsaved$ = this.stateService.unsaved;
    }

}
