import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QRCodeService, QRCode, QRCodeFilter } from '../../../services/qrcode.service';

@Component({
  selector: 'app-qrcode-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './qrcode-list.component.html',
  styleUrl: './qrcode-list.component.scss'
})
export class QRCodeListComponent {
  constructor(private qrCodeService: QRCodeService) { }

  qrcodes = signal<QRCode[]>([]);
  displayedColumns = ['type', 'qrData', 'createdAt', 'metadata'];
  filter: QRCodeFilter = {
    page: 1,
    pageSize: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  totalPages = 1;

  ngOnInit() {
    this.fetchQRCodes();
  }

  fetchQRCodes() {
    this.qrCodeService.getQRCodes(this.filter).subscribe({
      next: (data) => {
        this.qrcodes.set(data);
        this.totalPages = Math.ceil(100 / this.filter.pageSize); // 🔥 Suponha um total de 100 QR Codes (ajuste conforme necessário)
      },
      error: (err) => console.error('Erro ao buscar QR Codes:', err)
    });
  }

  onFilterChange() {
    this.filter.page = 1; // 🔥 Resetar para a primeira página ao mudar os filtros
    this.fetchQRCodes();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.filter.page = page;
      this.fetchQRCodes();
    }
  }
}
