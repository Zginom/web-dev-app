import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { SearchConfig, SearchControl, FieldTypes } from './search-config';
import { CamelCaseToSignPipe } from '../../pipes/camel-case-to-sign/camel-case-to-sign';
import { FormsModule, NgForm } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe('search component', () => {

    let fixture: ComponentFixture<SearchComponent>,
        instance: SearchComponent,
        element: DebugElement,
        form: NgForm,
        searchConfig: SearchConfig;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent,
                CamelCaseToSignPipe
            ],
            imports: [FormsModule]
        });

        fixture = TestBed.createComponent(SearchComponent);
        instance = fixture.componentInstance;
        searchConfig = new SearchConfig([
            new SearchControl(FieldTypes.INPUT_TEXT, 'title'),
            new SearchControl(FieldTypes.INPUT_NUMBER, 'price')
        ]);
        instance.controls = searchConfig.controls;
        element = fixture.debugElement;
        form = instance.searchForm;
        fixture.detectChanges();
    });

    function updateTitle(value) {
        const inputTitle: HTMLInputElement = element.query(By.css('input[id=search-by-title]')).nativeElement;
        inputTitle.value = value;
        inputTitle.dispatchEvent(new Event('input'));
    }

    it('should render inputs according to controls', () => {
        const inputs = element.queryAll(By.css('input'));
        expect(inputs.length).toBe(searchConfig.controls.length);
    });

    it('should update form value after input title change', async () => {
        await fixture.whenStable()
        updateTitle('tomato');
        expect(form.value.title).toBe('tomato');
    });

    it('output should be called when input title changes', async () => {
        spyOn(instance.searchChange, 'emit');
        expect(instance.searchChange.emit).not.toHaveBeenCalled();
        await fixture.whenStable()
        updateTitle('tomato');
        expect(instance.searchChange.emit).toHaveBeenCalled();
    });

    it('output value should be tomato when input title changes', async () => {
        let expectedTitle;
        instance.searchChange.subscribe(({ title }) => expectedTitle = title);
        await fixture.whenStable();
        updateTitle('tomato')
        expect(expectedTitle).toBe('tomato')
    });

    it('should clear form.value when clear function is called', async () => {
        await fixture.whenStable()
        updateTitle('tomato');
        expect(form.value).toEqual({ title: 'tomato', price: '' });
        instance.clear();
        expect(form.value).toEqual({ title: '', price: '' });
    });

});
