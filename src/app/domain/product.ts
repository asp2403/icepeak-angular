export abstract class Product {
    idProduct: number;
    idModel: number;

    constructor (idProduct: number, idModel: number) {
        this.idProduct = idProduct;
        this.idModel = idModel;
    }
}

export class Ski extends Product {
    height: number;

    constructor (idProduct: number, idModel: number, height: number) {
        super(idProduct, idModel);
        this.height = height;
    }
}

export class Boots extends Product {
    size: number;

    constructor (idProduct: number, idModel: number, size: number) {
        super(idProduct, idModel);
        this.size = size;
    }
}