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
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
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
          window.location.href = response.redirectUrl;
        }
      });
    }
  }
}
