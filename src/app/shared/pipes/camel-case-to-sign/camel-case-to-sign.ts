import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe lets you replace big letter (camelCase) to any sign.
 */
@Pipe({
    name: 'camelCaseToSign'
})
export class CamelCaseToSignPipe implements PipeTransform {
    transform(expression, sign) {
        return expression
            .replace(/[A-Z]/g, function (val) {
                return sign + val.toLowerCase();
            });
    }
}
