import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  token: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token'); // Captura o token da URL
    this.resetPasswordForm = this.fb.group({
      token: [this.token || '', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Captura a query string "token"
    this.token = this.route.snapshot.queryParamMap.get('token');

    // Verifica se o token é válido (não nulo ou vazio)
    if (!this.token) {
      // Redireciona para outra página ou exibe uma mensagem de erro
      this.router.navigate(['/error'], {
        queryParams: { message: 'Token inválido ou ausente' },
      });
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const request = this.resetPasswordForm.value;
      this.authService.resetPassword(request).subscribe({
        next: (response: any) => {
          this.successMessage = response;
          this.errorMessage = '';
          window.location.href = response.redirectUrl;
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = err.error || 'Erro ao redefinir a senha.';
        },
      });
    }
  }
}
