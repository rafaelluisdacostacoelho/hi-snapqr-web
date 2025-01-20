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
  packages = [
    {
      name: 'Pacote Básico',
      description: 'Ideal para pequenos negócios.',
      quantity: 50,
      price: 49.99
    },
    {
      name: 'Pacote Intermediário',
      description: 'Perfeito para negócios em crescimento.',
      quantity: 200,
      price: 149.99
    },
    {
      name: 'Pacote Avançado',
      description: 'A melhor solução para grandes empresas.',
      quantity: 500,
      price: 299.99
    },
    {
      name: 'Pacote Premium',
      description: 'Solução completa para demandas ilimitadas.',
      quantity: 1000,
      price: 499.99
    }
  ];

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
