export class WorkerFieldTypes {
    static NAME = 'name';
    static PHONE = 'phone';
    static CATEGORY = 'category';
}

export class WorkerModel {
    constructor(
        public id: number = null,
        public name: string,
        public phone: number,
        public category: string = 'sales') {
    }
}
