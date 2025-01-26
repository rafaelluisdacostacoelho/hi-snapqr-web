import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SqrButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, SqrButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
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
    if (this.isMenuOpen) {
      menuOverlay!.style.display = 'flex';
    } else {
      menuOverlay!.style.display = 'none';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const menuOverlay = document.getElementById('menuOverlay');
    menuOverlay!.style.display = 'none';
  }

  handleAuthAction() {
    if (this.isLoggedIn) {
      this.authService.signOut();
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
