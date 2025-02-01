import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingCarouselComponent } from "../pricing-carousel/pricing-carousel.component";

@Component({
  selector: 'app-packages',
  imports: [CommonModule, PricingCarouselComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

}
