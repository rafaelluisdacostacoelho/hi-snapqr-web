import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StepIndicatorComponent } from '../step-indicator/step-indicator.component';

@Component({
  selector: 'app-wizard',
  imports: [
    CommonModule,
    RouterOutlet,
    StepIndicatorComponent
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss'
})
export class WizardComponent {
  steps = [
    { label: 'Tipo', icon: '../../../../assets/icons/solids/signs-post.svg' },
    { label: 'Formato', icon: '../../../../assets/icons/solids/eye.svg' },
    { label: 'Quadro', icon: '../../../../assets/icons/solids/vector-square.svg' },
    { label: 'Logo', icon: '../../../../assets/icons/solids/image.svg' },
    { label: 'Cores', icon: '../../../../assets/icons/solids/palette.svg' },
    { label: 'QR', icon: '../../../../assets/icons/solids/qrcode.svg' },
  ];
  currentStep = 0;
  invalidSteps = [false, false, false, false];
  formData: any = {};

  constructor(private router: Router) { }

  next() {
    if (this.validateStep(this.currentStep)) {
      this.invalidSteps[this.currentStep] = false;
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.navigateToStep();
      }
    } else {
      this.invalidSteps[this.currentStep] = true;
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.navigateToStep();
    }
  }

  validateStep(step: number): boolean {
    return true;
    const requiredFields: Record<number, string[]> = {
      0: ['qrType'],
      1: ['format'],
      2: ['color']
    };

    if (!requiredFields[step]) return true;
    return requiredFields[step].every(field => this.formData[field]);
  }

  saveFormData(step: number, data: any) {
    this.formData = { ...this.formData, ...data };
  }

  navigateToStep() {
    const stepRoutes = ['qrcode-type', 'qrcode-format', 'qrcode-frame', 'qrcode-logo', 'qrcode-color'];
    this.router.navigate([`/dashboard/wizard/${stepRoutes[this.currentStep]}`]);
  }
}
