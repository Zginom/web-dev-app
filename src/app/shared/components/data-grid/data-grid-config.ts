export interface DataGridItemModel {
    key: string;
    type?: string;
    header?: string;
    access?: string;
}

export class FieldTypes {
    static INPUT = 'input';
    static IMAGE = 'img';
    static BUTTON = 'button';
}

export class ColumnNames {
    static ICON = 'icon';
    static REMOVE = 'remove';
    static MORE = 'more';
}

export class DataGridItem implements DataGridItemModel {
    constructor(
        public key,
        public type?,
        public header?,
        public access?) { }
}

export class DataGridConfig {
    constructor(public data: DataGridItem[]) {
    }

    add(item: DataGridItem) {
        this.data.push(item);
    }
}
