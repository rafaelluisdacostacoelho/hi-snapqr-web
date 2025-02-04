import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

import { QRCodeService, QRCode, QRCodeFilter } from '../../../services/qrcode.service';
import { DateTimePickerComponent } from 'src/app/shared/datetime-picker/datetime-picker.component';
import { SelectComponent } from 'src/app/shared/select/select.component';

@Component({
  selector: 'app-qrcode-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateTimePickerComponent,
    SelectComponent
],
  templateUrl: './qrcode-list.component.html',
  styleUrls: ['./qrcode-list.component.scss']
})
export class QRCodeListComponent implements OnInit {
  filterForm: FormGroup;
  displayedColumns = ['type', 'qrData', 'createdAt', 'metadata'];

  filter: QRCodeFilter = {
    page: 1,
    pageSize: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  qrcodes = signal<QRCode[]>([]);
  totalPages = 1;
  locale = 'pt-BR'; // Definir o local padrão como Brasil

  qrCodeTypes = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Pix', label: 'Pix' },
    { value: 'Bitcoin', label: 'Bitcoin' },
    { value: 'BitcoinLightning', label: 'Bitcoin Lightning' },
    { value: 'Url', label: 'URL' }
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
        this.totalPages = Math.ceil(100 / this.filter.pageSize); // Ajuste conforme necessário
      },
      error: (err) => console.error('Erro ao buscar QR Codes:', err)
    });
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

  createNew(): void {
    console.log('Criando novo QRCode');
  }

  archiveQRCodes(): void {
    console.log('Arquivando QRCodes selecionados');
  }

  getFormattedFilter(): QRCodeFilter {
    return {
      ...this.filter,
      ...this.filterForm.value,
      startDate: this.formatDate(this.filterForm.value.startDate),
      endDate: this.formatDate(this.filterForm.value.endDate)
    };
  }

  formatDate(date: string): string | null {
    if (!date) return null;
    return DateTime.fromISO(date).setLocale(this.locale).toFormat('dd/MM/yyyy');
  }
  
  formatCurrency(value: number, currency: 'BRL' | 'USD'): string {
    return new Intl.NumberFormat(this.locale, { style: 'currency', currency }).format(value);
  }
}
