import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SqrCheckoutComponent } from '../checkout-button/checkout-button.component';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, SqrCheckoutComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class PlanCardComponent {
  @Input() productId = '';
  @Input() name = '';
  @Input() description = '';
  @Input() price = 0;
  @Input() priceId = '';
}
