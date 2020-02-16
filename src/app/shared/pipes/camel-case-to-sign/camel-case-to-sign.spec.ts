import { CamelCaseToSignPipe } from './camel-case-to-sign';
describe('CamelCaseToSignPipe', () => {
    it('should transform text', () => {
        const camelCaseToSignPipe = new CamelCaseToSignPipe();
        expect(camelCaseToSignPipe.transform('camelCaseExample', '---'))
            .toBe('camel---case---example');
    });
});
