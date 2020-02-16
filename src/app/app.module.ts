import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CORSInterceptor } from './shared/services/xhr-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ContainersModule } from './containers/containers.module';
import { AppComponent } from './containers/root/app.component';
import { AuthComponent } from './containers/root/components/auth/auth.component';
import { NavComponent } from './containers/root/components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ContainersModule,
        SharedModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AuthComponent,
        NavComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CORSInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
