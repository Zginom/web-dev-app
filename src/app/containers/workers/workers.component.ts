import { Component, OnInit } from '@angular/core';
import { WorkersService } from './services/workers.service';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { SearchConfig, SearchControl, FieldTypes as SearchFieldTypes } from '../../shared/components/search/search-config';
import { DataGridConfig, DataGridItem, FieldTypes as DataGridFieldTypes } from '../../shared/components/data-grid/data-grid-config';
import { WorkerModel, WorkerFieldTypes } from './components/add-worker/worker-model';
import { share } from 'rxjs/operators';

@Component({
    templateUrl: './workers.component.html'
})
export class WorkersComponent implements OnInit {
    searchConfig: SearchConfig;
    dataGridConfig: DataGridConfig;
    filters: BehaviorSubject<any>;
    workers$: Observable<any>;
    workerAction: Subject<any>;

    constructor(public workersService: WorkersService) { }

    ngOnInit(): void {
        this.searchConfig = new SearchConfig([
            new SearchControl(SearchFieldTypes.INPUT_TEXT, WorkerFieldTypes.NAME),
            new SearchControl(SearchFieldTypes.INPUT_TEXT, WorkerFieldTypes.PHONE),
            new SearchControl(SearchFieldTypes.SELECT, WorkerFieldTypes.CATEGORY, '', ['', 'sales', 'support'])
        ]);

        this.dataGridConfig = new DataGridConfig([
            new DataGridItem(WorkerFieldTypes.NAME),
            new DataGridItem(WorkerFieldTypes.PHONE, DataGridFieldTypes.INPUT),
            new DataGridItem(null, DataGridFieldTypes.BUTTON, 'remove'),
            new DataGridItem(null, DataGridFieldTypes.BUTTON, 'more')
        ]);

        this.filters = new BehaviorSubject({});
        this.workerAction = new Subject();

        this.workerAction
            .subscribe((action) => this[action.type](action.data));

        this.fetchWorkers();
    }

    add(worker: WorkerModel) {
        this.workersService
            .add(worker)
            .subscribe(() => this.fetchWorkers());
    }

    updatephone(worker: WorkerModel) {
        this.workersService
            .update(worker)
            .subscribe();
    }

    updateFilters(value) {
        this.filters.next({ ...this.filters.value, ...value });
    }

    remove(worker: WorkerModel) {
        if (confirm('are you sure?')) {
            this.workersService
                .remove(worker.id)
                .subscribe(() => this.fetchWorkers());
        }
    }

    more(worker) {
        alert('WORKER DETAILS \n' + JSON.stringify(worker, null, 4));
    }

    fetchWorkers() {
        this.workers$ = this.workersService.fetch().pipe(share())
    }
}
