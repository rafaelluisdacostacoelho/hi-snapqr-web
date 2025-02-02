import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator()
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { 'passwordMismatch': true }
        : null;
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.name,
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .subscribe({
          next: () => {
            this.router.navigate(['account-activation']);
          }
        });
    }
  }
}
