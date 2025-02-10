import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

import { QRCodeTypeEnum } from 'src/app/models/enumerators/qrcode-type.enum';
import { SelectComponent } from 'src/app/shared/select/select.component';
import { QRCodeGenerator } from 'src/app/models/interfaces/qrcode-generator.interface';

@Component({
  selector: 'app-qrcode-type',
  imports: [CommonModule, ReactiveFormsModule, SelectComponent, RouterOutlet],
  templateUrl: './qrcode-type.component.html',
  styleUrl: './qrcode-type.component.scss'
})
export class QRCodeTypeComponent {
  qrCodeForm: FormGroup;
  public qrCodeId: string = '';
  public loading: boolean = false;
  public imageBase64 = '';

  qrCodeTypeDefault = QRCodeTypeEnum.Todos;
  qrCodeTypes = [
    { value: QRCodeTypeEnum.Pix, label: 'Pix' },
    { value: QRCodeTypeEnum.Bitcoin, label: 'Bitcoin' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.qrCodeForm = this.formBuilder.group({
      qrCodeType: [QRCodeTypeEnum.Pix, Validators.required],
      qrCodeData: ['', Validators.required]
    });
  }

  onTypeChange(type: number) {
    const selectedType = this.qrCodeTypes.find(qr => qr.value === type);
    const label = selectedType ? selectedType.label.toLowerCase() : 'pix';

    if (label === 'pix' || label === 'bitcoin') {
      this.router.navigate([`/dashboard/wizard/qrcode-type/${label}`]);
    } else {
      console.error(`Rota inválida: ${label}`);
    }
  }

  onChildActivate(component: QRCodeGenerator) {
    if (component.qrCodeGenerated) {
      component.qrCodeGenerated.subscribe((image: string) => {
        this.imageBase64 = image;
      });
    }
  }

  step = 1; // Etapa atual
  totalSteps = 4; // Número total de etapas

  nextStep() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
}
