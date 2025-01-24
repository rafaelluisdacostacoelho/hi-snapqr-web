import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.authService.signIn(this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']);  // Redireciona para o painel de controle
      },
      (error) => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    );
  }
}
