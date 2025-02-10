import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

import { QRCodeTypeEnum } from 'src/app/models/enumerators/qrcode-type.enum';
import { SelectComponent } from 'src/app/shared/select/select.component';
import { QRCodeGenerator } from 'src/app/models/interfaces/qrcode-generator.interface';
import { WizardComponent } from '../wizard/wizard.component';

@Component({
  selector: 'app-qrcode-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent, RouterOutlet],
  templateUrl: './qrcode-type.component.html',
  styleUrl: './qrcode-type.component.scss'
})
export class QRCodeTypeComponent implements OnInit {
  qrCodeForm!: FormGroup;  // Corrigido: Definição do FormGroup
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
    private router: Router,
    private wizard: WizardComponent
  ) {}

  ngOnInit() {
    this.qrCodeForm = this.formBuilder.group({
      qrCodeType: [QRCodeTypeEnum.Pix, Validators.required],
      qrCodeData: ['', Validators.required]
    });

    // Recupera valores já salvos no WizardComponent
    if (this.wizard.formData.qrCodeType) {
      this.qrCodeForm.patchValue({ qrCodeType: this.wizard.formData.qrCodeType });
    }
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

  saveData() {
    this.wizard.saveFormData(0, { qrCodeType: this.qrCodeForm.value.qrCodeType });
  }
}
