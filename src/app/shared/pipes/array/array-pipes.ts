import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe get all keys of object and return array with this keys
 */
@Pipe({
    name: 'mapToIterable'
})
export class MapToIterablePipe implements PipeTransform {
    transform(obj) {
        if (obj) {
            return Object.keys(obj);
        } else {
            return obj;
        }
    }
}