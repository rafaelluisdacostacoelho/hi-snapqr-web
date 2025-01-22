import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {

  private createdQRs: string[] = [];
  private remainingPulse: number = 10; // Exemplo: 10 pulsos para gerar QR Codes

  constructor() {
    // Inicializar QR Codes e pacotes de dados fictícios
    this.createdQRs = [
      'https://via.placeholder.com/150/0000FF/808080?text=QR+1',
      'https://via.placeholder.com/150/FF0000/FFFFFF?text=QR+2',
      'https://via.placeholder.com/150/00FF00/FFFFFF?text=QR+3'
    ];
  }

  // Retorna os QR Codes criados
  getCreatedQRs(): string[] {
    return this.createdQRs;
  }

  // Retorna os pulsos restantes
  getRemainingPulse(): number {
    return this.remainingPulse;
  }

  // Filtra QR Codes por tipo (filtro simples)
  getQRsByType(type: string): string[] {
    if (!type) {
      return this.createdQRs;
    }
    return this.createdQRs.filter((qr, index) => qr.includes(type)); // Simulação de filtro
  }
}
