export class Model {

    private _id: string;
    private _name: string;
    private _brandId: string

    constructor(name: string, brandId: string) {
        this._name = name;
        this._brandId = brandId;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get brandId(): string {
        return this._brandId;
    }

    set brandId(value: string) {
        this._brandId = value;
    }

    toPlainObj() {
        return {
            name: this._name,
            brandId: this._brandId
        };
    }

}
