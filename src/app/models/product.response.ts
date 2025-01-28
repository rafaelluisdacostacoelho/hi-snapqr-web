import { PriceResponse } from "./price.response";

export interface ProductResponse {
    productId: string;
    name: string;
    description: string;
    price: PriceResponse;
}