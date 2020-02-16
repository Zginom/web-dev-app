export class FieldTypes {
    static INPUT_TEXT = 'INPUT_TEXT';
    static INPUT_NUMBER = 'INPUT_NUMBER';
    static SELECT = 'SELECT';
    static IMAGE = 'IMAGE';
}

interface SearchControlModel {
    tag: string;
    name: string;
    value?: string;
    options?: string[];
}

export class SearchControl implements SearchControlModel {
    constructor(
        public tag,
        public name,
        public value?,
        public options?
    ) {
    }
}

export class SearchConfig {

    constructor(public controls: SearchControl[]) {
    }

    add(control: SearchControl) {
        this.controls.push(control);
    }
}
