import { Product } from "./product";

export class CartItem {
    product: Product;
    price?: number;
    qty: number = 1;
    
    constructor (product: Product, qty: number) {
        this.product = product;
        this.qty = qty;
    }
}