
export interface OrderDto {
    contactName: string;
    contactSurname: string;
    contactEmail: string;
    contactPhone: string;
    idCustomer?: number;
    idOrder?: number;
    items: OrderItemDto[];
}

export interface OrderItemDto {
    idProduct: number;
    qty: number;
    price?: number;
}