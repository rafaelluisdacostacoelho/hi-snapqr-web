import { Component, Input } from '@angular/core';

import { StripeCheckoutService } from 'src/app/services/stripe-checkout.service';
import { SqrButtonComponent } from "../../../shared/button/button.component";
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sqr-checkout-button',
  imports: [SqrButtonComponent],
  templateUrl: './checkout-button.component.html',
  styleUrl: './checkout-button.component.scss'
})
export class SqrCheckoutComponent {
  @Input() priceId = '';

  constructor(
    private authService: AuthService,
    private stripeCheckoutService: StripeCheckoutService,
    private router: Router
  ) { }

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
      const currentUrl = this.router.url;
      this.authService.navigateToLogin(currentUrl);
    }
  }
}
