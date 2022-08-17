import { Timestamp } from "rxjs";

export interface OrderDto {
    idOrder?: number;
    state?: number;
    contactName: string;
    contactSurname: string;
    contactEmail: string;
    contactPhone: string;
    idCustomer?: number;
    idManager?: number;
    orderDate?: string;
    assignDate?: Date;
    readyDate?: Date;
    finalDate?: Date;
  
    items: OrderItemDto[];
}

export interface OrderItemDto {
    idProduct: number;
    qty: number;
    price?: number;
}