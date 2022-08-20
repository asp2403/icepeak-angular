export interface ProductDto {
    id: number;
    qtyAvailable: number;
    qtyReserved: number;
}

export interface SkiDto extends ProductDto {
    height: number;
}

export interface BootsDto extends ProductDto {
    size: number;
}

