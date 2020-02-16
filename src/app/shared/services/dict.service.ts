import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DictService {
    dict = {
        pl: {
            required: 'pole wymagane',
            minlength: 'tekst za krótki',
            atLeastOne: 'wybierz min. jeden',
            passedDate: 'wymagana przeszła data',
            email: 'email niepoprawny',
            password: '4-8 znaków, małe i duże litery oraz cyfry',
            equal: 'wyrażenia nie są zgodne'
        },
        de: {
            required: 'erforderlich',
            minlength: 'min-Länge',
            atLeastOne: 'mindestens ein',
            passedDate: 'das Datum abgelaufen',
            email: 'ungültige E-Mail',
            password: '4-8 Zeichen, Buchstaben und Zahlen',
            equal: 'Ausdrücke stimmen nicht überein'
        }
    };
}
