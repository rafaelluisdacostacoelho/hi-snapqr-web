import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sqr-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class SqrButtonComponent {
  @Input() class = 'primary';                // Classe do botão (ex: primary, secondary)
  @Input() disabled = false;                 // Desabilita o botão
  @Input() icon = '';                        // Classe do ícone (ex: 'fa fa-home')
  @Input() iconPosition: 'left' | 'right' = 'left';
  
  // Controle de exibição
  @Input() showIconMobile = true;   // Se true, mostra o ícone no mobile
  @Input() showIconDesktop = true;  // Se true, mostra o ícone no desktop
  @Input() showTextMobile = true;   // Se true, mostra o texto no mobile
  @Input() showTextDesktop = true;  // Se true, mostra o texto no desktop
}
