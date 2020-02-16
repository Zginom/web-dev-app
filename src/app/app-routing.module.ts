import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InitComponent } from './containers/init/init.component';
import { ItemsComponent } from './containers/items/items/items.component';
import { ItemDetailsComponent } from './containers/items/item-details/item-details.component';
import { WorkersComponent } from './containers/workers/workers.component';
import { RegisterComponent } from './containers/register/register.component';
import { AuthService } from './containers/root/components/auth/services/auth.service';
import { ProfileComponent } from './containers/profile/profile.component';
import { ItemDetailsResolver } from './containers/items/item-details/items-details.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'home', component: InitComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'items/:id', component: ItemDetailsComponent, resolve: { item: ItemDetailsResolver } },
      { path: 'workers', canActivate: [AuthService], component: WorkersComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', canActivate: [AuthService], component: ProfileComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
