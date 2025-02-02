import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  returnUrl: string = '/'; // Caminho padrão caso não tenha returnUrl

  errorMessage: string = '';

  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Captura o parâmetro returnUrl da rota
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService
        .signIn(email, password)
        .subscribe({
          error: () => {
            this.errorMessage = 'Credenciais inválidas. Tente novamente.';
          }
        });
    }
  }
}
