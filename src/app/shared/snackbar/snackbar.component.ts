import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' | 'warning' = 'success';
  isVisible = false;
  timeoutRef: any;

  constructor(private snackbarService: SnackbarService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.snackbarService.snackbarState$.subscribe((state) => {
      if (state) {
        this.message = state.message;
        this.type = state.type;
        this.show();
      }
    });
  }

  show() {
    this.isVisible = true;
    this.cdr.detectChanges(); // 🔥 Garante que o Angular atualize a UI

    // 🔥 Fecha automaticamente após 4 segundos
    this.timeoutRef = setTimeout(() => this.hide(), 4000);
  }

  hide() {
    this.isVisible = false;
    this.cdr.detectChanges(); // 🔥 Atualiza o estado do Angular
    clearTimeout(this.timeoutRef); // 🔥 Impede múltiplos timeouts
  }
}
