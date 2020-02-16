import { LimitPipe } from './limit.pipe';

describe('Pipe: Limit', () => {
    let pipe: LimitPipe;

    beforeEach(() => {
        pipe = new LimitPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return two items form 2 index', () => {
        const items = [1, 2, 3, 4, 5, 6];
        expect(pipe.transform(items, 2, 2)).toEqual([3, 4]);
    });

});
