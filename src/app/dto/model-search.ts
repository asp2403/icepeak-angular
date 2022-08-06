import { ModelShortDto } from "./model";

export interface ModelSearchDto {
    content: ModelShortDto[];
    totalElements: number;
    number: number;
}