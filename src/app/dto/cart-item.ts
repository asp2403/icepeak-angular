export class CartItemDto {
    idProduct: number;
    vendor: string;
    model: string;
    price: number;
    qty: number;

    constructor (idProduct: number, vendor: string, model: string, price: number, qty: number) {
        this.idProduct = idProduct;
        this.vendor = vendor;
        this.model = model;
        this.price = price;
        this.qty = qty;
    }
}