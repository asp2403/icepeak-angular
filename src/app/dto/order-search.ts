import { OrderDto } from "./order";

export interface OrderSearchDto {
    content: OrderDto[];
    totalElements: number;
    number: number;
}