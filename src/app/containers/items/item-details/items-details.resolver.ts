import { Injectable } from '@angular/core';
import { ItemResolver, IItemModel } from '../items/item-model';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from '../items/services/items.service';

@Injectable({ providedIn: 'root' })
export class ItemDetailsResolver implements ItemResolver<IItemModel> {

    constructor(private itemsService: ItemsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IItemModel> {
        return this.itemsService.get(route.params['id'])
    }

}
