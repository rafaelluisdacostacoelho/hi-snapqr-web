import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SqrButtonComponent } from "../../../shared/button/button.component";

@Component({
  selector: 'app-services',
  imports: [CommonModule, SqrButtonComponent, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

}
