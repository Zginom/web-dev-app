import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(arr, filters) {
        if (arr && filters) {
            return arr.filter(item => {
                for (const key in filters) {
                    if (filters.hasOwnProperty(key)) {
                        const wanted = filters[key].toString().toLowerCase();
                        const prop = item[key].toString().toLowerCase();
                        if (prop.indexOf(wanted) === -1) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        return arr;
    }
}
