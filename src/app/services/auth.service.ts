import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
      .post<AuthResponse>(`${environment.url}/auths/register`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para realizar signIn
  signIn(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };
    return this.http
      .post<AuthResponse>(`${environment.url}/api/auths/sigin`, body)
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
        }),
        catchError(this.handleError)
      );
  }

  // Método para salvar o token no localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para recuperar o token do localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null;
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);  // Redireciona para a página de login
  }

  // Método para enviar o token nas requisições HTTP (se necessário)
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  // Função para tratamento de erros
  private handleError(error: any): Observable<never> {
    debugger;
    console.error('Erro no AuthService:', error);
    throw error;  // Ou um tratamento personalizado de erros
  }
}