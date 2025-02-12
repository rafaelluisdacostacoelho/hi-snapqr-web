import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { SqrButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-topbar',
  imports: [SqrButtonComponent, CommonModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  isMobile = window.innerWidth < 768;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('expanded');
  }

  handleAuthAction() {
    if (this.isLoggedIn) {
      this.authService.signOut();
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
