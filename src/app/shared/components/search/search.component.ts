import { AfterViewInit, Component, Input, Output, ViewChild, OnDestroy, EventEmitter } from '@angular/core';
import { SearchControl } from './search-config';
import { Subscriber } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent implements AfterViewInit, OnDestroy {

    @Input() controls: SearchControl[];
    @Output() searchChange = new EventEmitter();
    @ViewChild('searchForm', { static: true }) searchForm;
    formInitValue: {};
    formSubscriber: Subscriber<any>;

    ngAfterViewInit(): void {
        this.formSubscriber = this.searchForm
            .valueChanges
            .pipe(
                tap((value: { [key: string]: any }) => {
                    if (!this.formInitValue && Object.keys(value).length === this.controls.length) {
                        this.formInitValue = { ...value };
                    }
                }),
                filter(_ => !this.searchForm.pristine)
            )
            .subscribe((value) => this.searchChange.emit(value));
    }

    ngOnDestroy(): void {
        this.formSubscriber.unsubscribe();
    }

    clear() {
        this.searchForm.setValue(this.formInitValue);
    }
}
