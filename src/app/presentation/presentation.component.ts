import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-presentation',
  imports: [BannerComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent {

}
