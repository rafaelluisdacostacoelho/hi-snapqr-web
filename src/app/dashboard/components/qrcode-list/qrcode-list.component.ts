import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

import { QRCodeService, QRCode, QRCodeFilter } from '../../../services/qrcode.service';
import { DateTimePickerComponent } from 'src/app/shared/datetime-picker/datetime-picker.component';
import { SelectComponent } from 'src/app/shared/select/select.component';
import { QRCodeTypeEnum } from 'src/app/models/enumerators/qrcode-type.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-qrcode-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateTimePickerComponent,
    SelectComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './qrcode-list.component.html',
  styleUrls: ['./qrcode-list.component.scss']
})
export class QRCodeListComponent implements OnInit {
  filterForm: FormGroup;
  qrcodes = signal<QRCode[]>([]);
  selectedQRCodes: Set<string> = new Set();
  totalPages = 1;
  locale = 'pt-BR';

  displayedColumns = ['type', 'qrData', 'createdAt', 'metadata'];

  filter: QRCodeFilter = {
    page: 1,
    pageSize: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  qrCodeTypeDefault = QRCodeTypeEnum.Todos;
  qrCodeTypes = [
    { value: QRCodeTypeEnum.Todos, label: 'Todos' },
    { value: QRCodeTypeEnum.Pix, label: 'Pix' },
    { value: QRCodeTypeEnum.Bitcoin, label: 'Bitcoin' },
    { value: QRCodeTypeEnum.BitcoinLightning, label: 'Bitcoin Lightning' },
    { value: QRCodeTypeEnum.Url, label: 'URL' }
  ];

  constructor(private formBuilder: FormBuilder, private qrCodeService: QRCodeService) {
    this.filterForm = this.formBuilder.group({
      type: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit() {
    this.fetchQRCodes();
  }

  fetchQRCodes() {
    const formattedFilter = this.getFormattedFilter();

    this.qrCodeService.getQRCodes(formattedFilter).subscribe({
      next: (data) => {
        this.qrcodes.set(data);
        this.selectedQRCodes.clear();
        this.totalPages = Math.ceil(100 / this.filter.pageSize);
      }
    });
  }

  // Verifica se todos os QR Codes estão selecionados
  areAllSelected(): boolean {
    return this.qrcodes().length > 0 && this.qrcodes().every(qr => this.selectedQRCodes.has(qr.qrCodeId));
  }

  // Alterna a seleção de todos os QR Codes
  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.qrcodes().forEach(qr => this.selectedQRCodes.add(qr.qrCodeId));
    } else {
      this.qrcodes().forEach(qr => this.selectedQRCodes.delete(qr.qrCodeId));
    }
  }

  // Verifica se um QR Code específico está selecionado
  isSelected(qrCodeId: string): boolean {
    return this.selectedQRCodes.has(qrCodeId);
  }

  // Alterna a seleção de um QR Code específico
  toggleSelection(qrCodeId: string) {
    if (this.selectedQRCodes.has(qrCodeId)) {
      this.selectedQRCodes.delete(qrCodeId);
    } else {
      this.selectedQRCodes.add(qrCodeId);
    }
  }

  onFilterChange() {
    this.filter = { ...this.filter, ...this.getFormattedFilter() };
    this.fetchQRCodes();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.filter.page = page;
      this.fetchQRCodes();
    }
  }

  getFormattedFilter(): QRCodeFilter {
    return {
      ...this.filter,
      ...this.filterForm.value,
      startDate: this.formatDate(this.filterForm.value.startDate),
      endDate: this.formatDate(this.filterForm.value.endDate)
    };
  }

  archiveQRCodes(): void {
    const selectedIds = Array.from(this.selectedQRCodes);
    console.log('Arquivando QR Codes selecionados:', selectedIds);
  }

  formatDate(date: string): string | null {
    if (!date) return null;
    return DateTime.fromISO(date).setLocale(this.locale).toFormat('dd/MM/yyyy');
  }

  formatCurrency(value: number, currency: 'BRL' | 'USD'): string {
    return new Intl.NumberFormat(this.locale, { style: 'currency', currency }).format(value);
  }
}
