import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CheckoutResponse } from '../models/checkout.response';
import { ProductResponse } from '../models/product.response';

@Injectable({
  providedIn: 'root'
})
export class StripeCheckoutService {

  constructor(private http: HttpClient) { }

  createCheckoutSession(priceId: string) {
    return this.http.post<CheckoutResponse>(`${environment.url}/packages/create-checkout-session`, { priceId });
  }

  getProducts() {
    return this.http.get<ProductResponse[]>(`${environment.url}/packages`);
  }
}
