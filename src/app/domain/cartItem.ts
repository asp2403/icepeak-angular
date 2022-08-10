import { ModelShortDto } from "../dto/model";
import { Category } from "./category";
import { Boots, Product, Ski } from "./product";

export class CartItem {
    product: Product;
    qty: number = 1;
    
    constructor (product: Product, qty: number) {
        this.product = product;
        this.qty = qty;
    }
}

export class CartDatasourceItem {
    idProduct: number;
    image: string;
    vendor: string;
    model: string;
    price: number;
    qty: number;

    constructor (cartItem: CartItem, model: ModelShortDto) {
        this.idProduct = cartItem.product.idProduct;
        this.image = model.image;
        this.vendor = model.vendor;
        this.model = model.model;
        if (cartItem.product.category == Category.SKI) {
            this.model += ` (Ростовка: ${(cartItem.product as Ski).height})`;
        } else {
            this.model += ` (Размер: ${(cartItem.product as Boots).size})`;
        }
        this.price = model.price;
        this.qty = cartItem.qty;
    }
}
