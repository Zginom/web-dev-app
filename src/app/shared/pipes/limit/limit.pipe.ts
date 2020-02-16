import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limit'
})
export class LimitPipe implements PipeTransform {

    transform(items: {}[], currentPage: number, itemsPerPage: number = 10): any {
        if (items && currentPage) {
            let start = (currentPage - 1) * +itemsPerPage;
            return items.slice(start, start + +itemsPerPage);
        }
    }

}
