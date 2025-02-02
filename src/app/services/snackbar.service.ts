import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarState = new BehaviorSubject<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  snackbarState$ = this.snackbarState.asObservable();

  showMessage(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.snackbarState.next({ message, type });

    // Garante que o snackbar desapareça após 4 segundos
    setTimeout(() => {
      this.snackbarState.next(null);
    }, 4000);
  }
}
