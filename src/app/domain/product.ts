import { Category } from "./category";

export abstract class Product {
    idProduct: number;
    idModel: number;
    category!: Category;

    constructor (idProduct: number, idModel: number) {
        this.idProduct = idProduct;
        this.idModel = idModel;
    }
}

export class Ski extends Product {
    height: number;

    constructor (idProduct: number, idModel: number, height: number) {
        super(idProduct, idModel);
        this.category = Category.SKI;
        this.height = height;
    }
}

export class Boots extends Product {
    size: number;

    constructor (idProduct: number, idModel: number, size: number) {
        super(idProduct, idModel);
        this.category = Category.BOOTS;
        this.size = size;
    }
}