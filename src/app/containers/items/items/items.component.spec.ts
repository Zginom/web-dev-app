import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { ItemsService } from './services/items.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { CamelCaseToSignPipe } from '../../../shared/pipes/camel-case-to-sign/camel-case-to-sign';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StateService } from '../../../shared/services/state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Items component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            declarations: [
                ItemsComponent,
                SearchComponent,
                CamelCaseToSignPipe
            ],
            providers: [
                ItemsService,
                StateService
            ]
        });
    });

    describe('when filters change', () => {
        it('should call fetchItems() after 500 ms', fakeAsync(() => {
            TestBed
                .overrideComponent(ItemsComponent, {
                    set: {
                        template: '<div>Overridden template here</div>'
                    }
                });
            const fixture = TestBed.createComponent(ItemsComponent);
            const instance = fixture.componentInstance;
            spyOn(instance, 'fetchItems');
            fixture.detectChanges();
            expect(instance.fetchItems).not.toHaveBeenCalled();
            tick(500);
            expect(instance.fetchItems).toHaveBeenCalled();
        }));
    });

    describe('when input in searchComponent changed', () => {
        it('should call fetchItems()', async () => {
            TestBed
                .overrideComponent(ItemsComponent, {
                    set: {
                        template: `
                        <app-search
                            [controls]='searchConfig.controls'
                            (searchChange)='updateFilters($event)'>
                        </app-search>`
                    }
                });
            const fixture = TestBed.createComponent(ItemsComponent);
            const instance = fixture.componentInstance;
            spyOn(instance, 'fetchItems');

            fixture.detectChanges();
            await fixture.whenStable()
            const searchByTitle = fixture.debugElement.query(By.css('#search-by-title')).nativeElement;
            searchByTitle.value = 'cheese';
            searchByTitle.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(instance.filters.getValue().title).toBe('cheese');
            expect(instance.fetchItems).toHaveBeenCalled();
        });
    });

});
