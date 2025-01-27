import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeCheckoutService {

  private apiUrl = 'http://localhost:5000/api/payments'; // Ajuste conforme seu endpoint

  constructor(private http: HttpClient) {}

  createCheckoutSession(amount: number, currency: string, productName: string) {
    const successUrl = 'http://localhost:4200/success';
    const cancelUrl = 'http://localhost:4200/cancel';

    return this.http.post<{ url: string }>(`${this.apiUrl}/create-checkout-session`, {
      amount: amount,
      currency: currency,
      productName: productName,
      successUrl: successUrl,
      cancelUrl: cancelUrl
    });
  }
}
