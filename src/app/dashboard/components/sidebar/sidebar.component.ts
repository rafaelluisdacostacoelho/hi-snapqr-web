import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Users', link: '/users' },
    { label: 'Reports', link: '/reports' }
  ];
  isMobile = window.innerWidth < 768;
  isExpanded = !this.isMobile;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
