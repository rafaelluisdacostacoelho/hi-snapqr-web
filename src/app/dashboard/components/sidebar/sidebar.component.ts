import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SqrButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, SqrButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Pesquisa de QR Codes', link: '/dashboard/qrcode-list' },
    { label: 'Criador de QR Code', link: '/dashboard/qrcode-add' },
    { label: 'Analytics', link: '/dashboard/analytics' },
    { label: 'Configurações', link: '/dashboard/settings' },
  ];
  isMobile: boolean;
  isExpanded: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 768;
    this.isExpanded = !this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isExpanded = false;
    }
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('expanded');
  }
}
