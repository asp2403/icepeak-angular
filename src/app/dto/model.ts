import { ProductDto } from "./product";

export interface ModelBasicDto {
    id: number;
    category: number;
    model: string;
    vendor: string;
    price: number;
}

export interface ModelShortDto extends ModelBasicDto {  
    image: string;
}

export interface ModelFullDto extends ModelShortDto {
    description: string;
    age: string;
    gender: string;
    products: ProductDto[];
}

export interface ModelBasicSearchDto {
    content: ModelBasicDto[];
    totalElements: number;
    number: number;
}