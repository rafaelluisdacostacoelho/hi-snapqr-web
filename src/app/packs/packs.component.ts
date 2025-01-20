import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-packs',
  imports: [CommonModule],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.scss'
})
export class PacksComponent implements OnInit {
  public packages = [
    { id: 1, name: 'Pacote 1', quantity: 5, price: 5, discount: 0 },
    { id: 2, name: 'Pacote 2', quantity: 10, price: 9, discount: 0.1 },
    { id: 3, name: 'Pacote 3', quantity: 20, price: 17, discount: 0.2 },
    { id: 4, name: 'Pacote 4', quantity: 50, price: 40, discount: 0.3 }];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  initiatePayment(packageId: number): void {
    // Aqui você pode adicionar a lógica para iniciar o pagamento via Stripe ou Pix 
    // Por exemplo, fazer uma chamada HTTP para a API do Stripe implementada em DotNet 
    this.http
      .post(environment.url, { packageId: packageId })
      .subscribe({
        next: response => {
          console.log('Payment initiated:', response);
        },
        error: error => {
          console.error('Erro ao iniciar o pagamento:', error);
        }
      });
  }
}
