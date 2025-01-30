import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';

import { SqrCheckoutComponent } from '../checkout-button/checkout-button.component';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, SqrCheckoutComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class PlanCardComponent implements OnInit {
  @Input() productId = '';
  @Input() name = '';
  @Input() description = '';
  @Input() quantity = '';
  @Input() price = 0;
  @Input() priceId = '';
  @Input() imageUrl = '';
  @Input() imageCaption = '';

  quantityNumber: number = 0;

  ngOnInit() {
    this.quantityNumber = Number(this.quantity);
  }
}
