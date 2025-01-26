import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ForgotPasswordRequest } from '../models/forgot-password.request';
import { ResetPasswordRequest } from '../models/reset-password.request';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) { }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const body = { name, email, password };
    return this.http
      .post<AuthResponse>(`${environment.url}/auth/register`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.url}/auth/sign-in`, { email, password })
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
        }),
        catchError(this.handleError)
      );
  }

   /**
   * Envia um pedido de recuperação de senha para o servidor.
   * @param forgotPasswordRequest Dados necessários para a recuperação de senha.
   */
   forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<string> {
    const url = `${environment.url}/auth/forgot-password`;
    return this.http.post<string>(url, forgotPasswordRequest);
  }

  /**
   * Redefine a senha do usuário utilizando o token e a nova senha.
   * @param resetPasswordRequest Dados necessários para redefinir a senha.
   */
  resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<string> {
    const url = `${environment.url}/auth/reset-password`;
    return this.http.post<string>(url, resetPasswordRequest);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null;
  }

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/sigin']);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no AuthService:', error);
    throw error;
  }
}