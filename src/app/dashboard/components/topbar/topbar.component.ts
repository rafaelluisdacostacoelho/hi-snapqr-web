import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SqrButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-topbar',
  imports: [SqrButtonComponent, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  isMobile = window.innerWidth < 768;

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('expanded');
  }
}
