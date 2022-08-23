import { Timestamp } from "rxjs";
import { ManagerDto } from "./user";
import { ProductDto } from "./product";

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

export interface OrderTitleDto {
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
}

export interface OrderItemFullDto {
    product: ProductDto;
    category: number;
    model: string;
    qty: number;
    salePrice: number;
}

export interface OrderFullDto {
    title: OrderTitleDto;
    items: OrderItemFullDto[];
}