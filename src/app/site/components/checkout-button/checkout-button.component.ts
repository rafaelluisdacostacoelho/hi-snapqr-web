import { Component, Input } from '@angular/core';

import { StripeCheckoutService } from 'src/app/services/stripe-checkout.service';
import { SqrButtonComponent } from "../../../shared/button/button.component";

@Component({
  selector: 'sqr-checkout-button',
  imports: [SqrButtonComponent],
  templateUrl: './checkout-button.component.html',
  styleUrl: './checkout-button.component.scss'
})
export class SqrCheckoutComponent {
  @Input() priceId = '';

  constructor(private stripeCheckoutService: StripeCheckoutService) { }

  goToCheckout() {
    this.stripeCheckoutService
      .createCheckoutSession(this.priceId)
      .subscribe({
        next: (response: any) => {
          window.location.href = response.url;
        },
        error: (error: any) => {
          console.error(error);
        }
    });
  }
}
