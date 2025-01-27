import { Component } from '@angular/core';

import { StripeCheckoutService } from 'src/app/services/stripe-checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  constructor(private stripeService: StripeCheckoutService) { }

  onBuy() {
    // Vamos supor que queremos criar uma sessão para R$ 10,00
    this.stripeService.createCheckoutSession(1000, 'brl', 'Exemplo de Produto')
      .subscribe((response: any) => {
        if (response.url) {
          // Redirecionar para a página de checkout hospedada no Stripe
          window.location.href = response.url;
        }
      });
  }
}
