import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanCardComponent } from '../product-card/product-card.component';
import { StripeCheckoutService } from 'src/app/services/stripe-checkout.service';
import { ProductResponse } from 'src/app/models/product.response';

@Component({
  selector: 'app-pricing-carousel',
  imports: [CommonModule, PlanCardComponent],
  templateUrl: './pricing-carousel.component.html',
  styleUrl: './pricing-carousel.component.scss'
})
export class PricingCarouselComponent implements OnInit {
  products: ProductResponse[] = [];

  currentSlide = 0;
  totalSlides = this.products.length;

  constructor(private stripeCheckoutService: StripeCheckoutService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide + this.totalSlides - 1) % this.totalSlides;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getProducts() {
    this.stripeCheckoutService
      .getProducts()
      .subscribe({
        next: (products: ProductResponse[]) => {
          this.products = products;
        }
      });
  }
}
