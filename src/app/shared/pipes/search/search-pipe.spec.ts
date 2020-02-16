import { SearchPipe } from './search-pipe';
import { PipeTransform } from '@angular/core';

describe('search pipe', () => {

    let searchPipe: PipeTransform;
    const items = [
        { title: 'creme', price: 10 },
        { title: 'juice', price: 5 },
        { title: 'coke', price: 3 },
        { title: 'cookie', price: 4 }
    ];

    beforeEach(() => {
        searchPipe = new SearchPipe();
    });

    it('should return filtered array', () => {
        const filters = { title: 'juice' };
        const result = searchPipe.transform(items, filters);
        expect(result.length).toBe(1);
        expect(result[0].title).toEqual(items[1].title);
    });

    it('should return empty array', () => {
        const filters = { title: 'notExists' };
        const result = searchPipe.transform(items, filters);
        expect(result).toEqual([]);
    });

    it('should found 2 items', () => {
        const filters = { title: 'co' };
        const result = searchPipe.transform(items, filters);
        expect(result.length).toBe(2);
        expect(result).toEqual([items[2], items[3]]);
    });

});