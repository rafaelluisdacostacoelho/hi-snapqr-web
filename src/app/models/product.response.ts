import { MetadataResponse } from "./metadata.response";
import { PriceResponse } from "./price.response";

export interface ProductResponse {
    productId: string;
    name: string;
    description: string;
    price: PriceResponse;
    metadata: MetadataResponse;
}