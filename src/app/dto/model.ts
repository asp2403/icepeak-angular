import { ProductDto } from "./product";

export interface ModelShortDto {
    id: number;
    category: number;
    model: string;
    vendor: string;
    price: number;
    image: string;
}

export interface ModelFullDto extends ModelShortDto {
    description: string;
    age: string;
    gender: string;
    products: ProductDto[];
}