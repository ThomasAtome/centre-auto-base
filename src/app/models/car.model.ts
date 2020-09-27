export class Car {

    private _id: string;
    private _dateFirstRelease: string;
    private _energyType: string;
    private _gearboxType: string;
    private _horsePower: number;
    private _mileage: number;
    private _doorsNb: number;
    private _placesNb: number;
    private _color: string;
    private _imgPath: string;
    private _brandId: string;
    private _modelId: string;

    constructor(dateFirstRelease: string = '', energyType: string  = '', gearboxType: string = '', horsePower: number = undefined, mileage: number = undefined, doorsNb: number = 0, placesNb: number = 0, color: string = '', brandId: string = '', modelId: string = '') {
        this._dateFirstRelease = dateFirstRelease;
        this._energyType = energyType;
        this._gearboxType = gearboxType;
        this._horsePower = horsePower;
        this._mileage = mileage;
        this._doorsNb = doorsNb;
        this._placesNb = placesNb;
        this._color = color;
        this._brandId = brandId;
        this._modelId = modelId;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get dateFirstRelease(): string {
        return this._dateFirstRelease;
    }

    set dateFirstRelease(value: string) {
        this._dateFirstRelease = value;
    }

    get energyType(): string {
        return this._energyType;
    }

    set energyType(value: string) {
        this._energyType = value;
    }

    get gearboxType(): string {
        return this._gearboxType;
    }

    set gearboxType(value: string) {
        this._gearboxType = value;
    }

    get horsePower(): number {
        return this._horsePower;
    }

    set horsePower(value: number) {
        this._horsePower = value;
    }

    get mileage(): number {
        return this._mileage;
    }

    set mileage(value: number) {
        this._mileage = value;
    }

    get doorsNb(): number {
        return this._doorsNb;
    }

    set doorsNb(value: number) {
        this._doorsNb = value;
    }

    get placesNb(): number {
        return this._placesNb;
    }

    set placesNb(value: number) {
        this._placesNb = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get imgPath(): string {
        return this._imgPath;
    }

    set imgPath(value: string) {
        this._imgPath = value;
    }

    get brandId(): string {
        return this._brandId;
    }

    set brandId(value: string) {
        this._brandId = value;
    }

    get modelId(): string {
        return this._modelId;
    }

    set modelId(value: string) {
        this._modelId = value;
    }

    toPlainObj() {
        return {
            dateFirstRelease: this._dateFirstRelease,
            energyType: this._energyType,
            gearboxType: this._gearboxType,
            horsePower: this._horsePower,
            mileage: this._mileage,
            doorsNb: this._doorsNb,
            placesNb: this._placesNb,
            color: this._color,
            imgPath: this._imgPath,
            brandId: this._brandId,
            modelId: this._modelId
        }
    }
}
