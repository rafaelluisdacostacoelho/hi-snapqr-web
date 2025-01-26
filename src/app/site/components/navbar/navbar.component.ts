import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SqrButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, SqrButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menuOverlay = document.getElementById('menuOverlay');
    const menuBtn = document.getElementById('menuBtn');
    if (this.isMenuOpen) {
      menuOverlay!.style.display = 'flex'; // Exibe o menu
      menuBtn!.classList.add('open');
    } else {
      menuOverlay!.style.display = 'none'; // Esconde o menu
      menuBtn!.classList.remove('open');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const menuOverlay = document.getElementById('menuOverlay');
    const menuBtn = document.getElementById('menuBtn');
    menuOverlay!.style.display = 'none'; // Esconde o menu
    menuBtn!.classList.remove('open');
  }
}
