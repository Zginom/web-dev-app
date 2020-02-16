import { NgModule } from "@angular/core";
import { InitComponent } from "./init/init.component";
import { ItemsComponent } from "./items/items/items.component";
import { ItemDetailsComponent } from "./items/item-details/item-details.component";
import { RegisterComponent } from "./register/register.component";
import { WorkersComponent } from "./workers/workers.component";
import { AddWorkerComponent } from "./workers/components/add-worker/add-worker.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ModalAddItemComponent } from "./items/items/components/add/modal-add-item.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
    declarations: [
        InitComponent,
        ItemsComponent,
        ModalAddItemComponent,
        ItemDetailsComponent,
        RegisterComponent,
        WorkersComponent,
        AddWorkerComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgbModule
    ]
})

export class ContainersModule {

}
