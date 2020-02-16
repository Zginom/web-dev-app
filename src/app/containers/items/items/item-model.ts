import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
export class ItemTypes {
    static TITLE = 'title';
    static PRICE = 'price';
    static IMG_SRC = 'imgSrc';
    static CATEGORY = 'category';
    static ID = 'id';
}

export interface IItemModel {
    category: string;
    imgSrc: string;
    price: number;
    title: string;
    id?: number;
}

export class ItemModel implements IItemModel {
    constructor(
        public category: string,
        public imgSrc: string,
        public price: number,
        public title: string,
        public id: number
    ) { }
}

export interface ItemResolver<T> {
    resolve(route: ActivatedRouteSnapshot): Observable<T>
}
