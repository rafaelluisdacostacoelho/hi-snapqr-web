import { Component, OnInit }
  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-qr-code-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './qr-code-generator.component.html',
  styleUrl: './qr-code-generator.component.scss'
})
export class QrCodeGeneratorComponent {
  public keyPix: string = '';
  public loading: boolean = false;
  public imageBase64 = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.loading = true;
    this.http.post(environment.url, {
      PixKey: this.keyPix
    }).subscribe({
      next: (response: any) => {
        this.imageBase64 = response.qrCodeBase64;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao gerar QRCode:', error); this.loading = false;
      }
    });
  }
}
