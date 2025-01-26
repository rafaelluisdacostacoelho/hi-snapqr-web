import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const request = this.forgotPasswordForm.value;
      this.authService.forgotPassword(request).subscribe({
        next: (response) => {
          this.successMessage = response;
          this.errorMessage = '';
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = err.error || 'Erro ao enviar o pedido de recuperação.';
        },
      });
    }
  }
}