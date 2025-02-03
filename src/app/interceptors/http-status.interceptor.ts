import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';

interface ProblemDetails {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    errors?: { [key: string]: string[] };
}

@Injectable()
export class HttpStatusInterceptor implements HttpInterceptor {
    constructor(private snackbarService: SnackbarService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Erro desconhecido';

                if (error.error instanceof ErrorEvent) {
                    // Erros de rede ou do cliente (Ex: Sem conexão)
                    errorMessage = `Erro do cliente: ${error.error.message}`;
                } else if (error.error && error.error.title) {
                    // Tratamento para ProblemDetails do .NET
                    const problemDetails: ProblemDetails = error.error;
                    errorMessage = problemDetails.detail || problemDetails.title || 'Ocorreu um erro inesperado.';

                    // Se houver erros de validação, concatenamos as mensagens
                    if (problemDetails.errors) {
                        const validationMessages = Object.values(problemDetails.errors)
                            .flat()
                            .join(' | ');
                        errorMessage += ` - ${validationMessages}`;
                    }
                } else {
                    // Erros genéricos do servidor sem ProblemDetails
                    errorMessage = error.error?.message || `Verifique sua conexão com a internet.`;
                }

                // 🔥 Chamamos o SnackbarService corretamente
                setTimeout(() => {
                    this.snackbarService.showMessage(errorMessage, 'error');
                }, 100);

                return throwError(() => new Error(errorMessage));
            })
        );
    }
}
