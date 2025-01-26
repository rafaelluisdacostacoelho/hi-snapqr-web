import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {
    this.checkTokenOnLoad();
  }

  /**
   * Verifica se existe token no localStorage ao carregar o serviço
   * e atualiza o subject de acordo.
   */
  private checkTokenOnLoad(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token && !this.isTokenExpired(token)) {
      this.authStatusSubject.next(true);
    } else {
      this.authStatusSubject.next(false);
    }
  }

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

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatusSubject.next(false);
    this.router.navigate(['/sign-in']);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no AuthService:', error);
    throw error;
  }

  /**
   * Retorna true se o usuário estiver logado.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Caso queira verificar expiração via payload do JWT.
   * Exemplo simples (sem validar assinatura).
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // exp é em segundos, convertendo p/ ms
      return Date.now() > exp;
    } catch (e) {
      return true; // Se der erro, consideramos expirado
    }
  }
}