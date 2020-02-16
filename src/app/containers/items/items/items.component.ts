import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';
import { IItemModel, ItemTypes } from './item-model';
import { SearchConfig, SearchControl, FieldTypes as SearchFieldTypes } from '../../../shared/components/search/search-config';
import { ItemsFilters, FilterTypes } from './items-filters';

import { Router } from '@angular/router';
import { DataGridConfig, DataGridItem, FieldTypes as DGFieldTypes, ColumnNames as DGColumnNames } from '../../../shared/components/data-grid/data-grid-config';
import { StateService } from '../../../shared/services/state.service';

import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    providers: [
        ItemsService
    ]
})
export class ItemsComponent implements OnInit, OnDestroy {

    searchConfig: SearchConfig;
    dataGridConfig: DataGridConfig;
    filters: BehaviorSubject<ItemsFilters>;
    itemAction: Subject<any>;
    items: IItemModel[];
    total: number;
    filtersSubscriber: Subscription;
    itemActionSubscriber: Subscription;

    constructor(public itemsService: ItemsService,
        public statusService: StateService,
        public router: Router) {
    }

    ngOnDestroy(): void {
        this.filtersSubscriber.unsubscribe();
        this.itemActionSubscriber.unsubscribe();
    }

    ngOnInit(): void {
        this.searchConfig = new SearchConfig([
            new SearchControl(SearchFieldTypes.INPUT_TEXT, FilterTypes.TITLE),
            new SearchControl(SearchFieldTypes.INPUT_NUMBER, FilterTypes.PRICE_FROM),
            new SearchControl(SearchFieldTypes.SELECT, FilterTypes.CATEGORY, '', ['', 'food', 'clothes']),
            new SearchControl(SearchFieldTypes.SELECT, FilterTypes.ITEMS_PER_PAGE, 5, [2, 5, 10])
        ]);

        this.dataGridConfig = new DataGridConfig([
            new DataGridItem(ItemTypes.TITLE),
            new DataGridItem(ItemTypes.PRICE, DGFieldTypes.INPUT, null, this.statusService.access),
            new DataGridItem(ItemTypes.IMG_SRC, DGFieldTypes.IMAGE, DGColumnNames.ICON),
            new DataGridItem(null, DGFieldTypes.BUTTON, DGColumnNames.REMOVE, this.statusService.access),
            new DataGridItem(null, DGFieldTypes.BUTTON, DGColumnNames.MORE)
        ]);

        this.filters = new BehaviorSubject(new ItemsFilters());
        this.itemAction = new Subject();

        this.filtersSubscriber = this.filters
            .pipe(debounceTime(500))
            .subscribe(() => this.fetchItems());

        this.itemActionSubscriber = this.itemAction
            .subscribe((action) => this[action.type](action.data));
    }

    fetchItems() {
        this.itemsService
            .fetch(this.filters.getValue())
            .subscribe(
                (result) => {
                    this.items = result.data;
                    this.total = result.total;
                });
    }

    updateFilters(value) {
        this.filters.next({ ...this.filters.value, ...value });
    }

    add(item: IItemModel) {
        this.itemsService
            .add(item)
            .subscribe(() => this.fetchItems());
    }

    updateprice(item: IItemModel) {
        this.itemsService
            .update(item)
            .subscribe();
    }

    remove(item) {
        if (confirm('are you sure?')) {
            this.itemsService
                .remove(item.id)
                .subscribe(() => this.fetchItems());
        }
    }

    more(item) {
        this.router.navigate(['items/' + item.id]);
    }

}
