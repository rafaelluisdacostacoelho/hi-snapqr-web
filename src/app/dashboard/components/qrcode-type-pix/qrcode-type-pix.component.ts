import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QRCodeTypeEnum } from 'src/app/models/enumerators/qrcode-type.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qrcode-type-pix',
  imports: [],
  templateUrl: './qrcode-type-pix.component.html',
  styleUrl: './qrcode-type-pix.component.scss'
})
export class QRCodeTypePixComponent {
  @Output() qrCodeGenerated = new EventEmitter<string>();

  pixForm: FormGroup;

  public qrCodeId: string = '';
  public loading: boolean = false;
  public imageBase64 = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.pixForm = this.formBuilder.group({
      pixKey: [QRCodeTypeEnum.Pix, Validators.required],
      amount: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.pixForm.invalid) return;

    const requestData = {
      Type: Number(this.pixForm.value.qrCodeType),
      Data: this.pixForm.value.qrCodeData,
      Id: this.qrCodeId // Se estiver editando, mantém o mesmo ID
    };

    this.loading = true;
    this.imageBase64 = '';

    this.http
      .post(`${environment.url}/qrcodes`, requestData)
      .subscribe({
        next: (response: any) => {
          this.qrCodeId = response.id;
          this.imageBase64 = response.qrCodeBase64;
          this.qrCodeGenerated.emit(response.qrCodeBase64);
          this.loading = false;
        }
      });
  }
}
