import { NgModule } from "@angular/core";
import { DataGridComponent } from "./components/data-grid/data-grid.component";
import { DataGridRowComponent } from "./components/data-grid/data-grid-row/data-grid-row.component";
import { SearchComponent } from "./components/search/search.component";
import { FileUploadComponent } from "./components/upload/file-upload.component";
import { ValidatorComponent } from "./components/validator/validator.component";
import { SetColorDirective } from "./directives/set-color.directive";
import { MapToIterablePipe } from "./pipes/array/array-pipes";
import { CamelCaseToSignPipe } from "./pipes/camel-case-to-sign/camel-case-to-sign";
import { LimitPipe } from "./pipes/limit/limit.pipe";
import { SearchPipe } from "./pipes/search/search-pipe";
import { TranslatePipe } from "./pipes/translate/translate.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { ModalConfirmComponent } from "./components/modal/confirm/modal-confirm.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DataGridComponent,
        DataGridRowComponent,
        SearchComponent,
        FileUploadComponent,
        ModalConfirmComponent,
        ValidatorComponent,
        SetColorDirective,
        MapToIterablePipe,
        CamelCaseToSignPipe,
        LimitPipe,
        SearchPipe,
        TranslatePipe
    ],
    exports: [
        DataGridComponent,
        DataGridRowComponent,
        SearchComponent,
        FileUploadComponent,
        ModalConfirmComponent,
        ValidatorComponent,
        SetColorDirective,
        MapToIterablePipe,
        CamelCaseToSignPipe,
        LimitPipe,
        SearchPipe,
        TranslatePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedModule { }
