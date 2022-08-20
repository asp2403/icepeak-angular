import { Timestamp } from "rxjs";
import { ManagerDto } from "./user";

export interface OrderDto {
    idOrder?: number;
    state?: number;
    contactName: string;
    contactSurname: string;
    contactEmail: string;
    contactPhone: string;
    idCustomer?: number;
    manager?: ManagerDto;
    orderDate?: string;
    assignDate?: string;
    readyDate?: string;
    finalDate?: string;
  
    items: OrderItemDto[];
}

export interface OrderItemDto {
    idProduct: number;
    qty: number;
    price?: number;
}