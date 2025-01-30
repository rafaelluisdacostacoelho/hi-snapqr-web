import { Component, Input } from '@angular/core';

import { StripeCheckoutService } from 'src/app/services/stripe-checkout.service';
import { SqrButtonComponent } from "../../../shared/button/button.component";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sqr-checkout-button',
  imports: [SqrButtonComponent],
  templateUrl: './checkout-button.component.html',
  styleUrl: './checkout-button.component.scss'
})
export class SqrCheckoutComponent {
  @Input() priceId = '';

  constructor(private authService: AuthService, private stripeCheckoutService: StripeCheckoutService) { }

  goToCheckout() {
    if (this.authService.isAuthenticated()) {
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
    } else {
      this.authService.navigateToLogin();
    }
  }
}
