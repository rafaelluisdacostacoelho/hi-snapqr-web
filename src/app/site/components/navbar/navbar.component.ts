import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SqrButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, SqrButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Sempre que 'authStatus$' emitir, atualizamos 'isLoggedIn'.
    this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

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

  handleAuthAction() {
    if (this.isLoggedIn) {
      // Se usuário está logado, faz logout
      this.authService.signOut();
    } else {
      // Se usuário não está logado, vai para tela de login
      this.router.navigate(['/sign-in']);
    }
  }
}
