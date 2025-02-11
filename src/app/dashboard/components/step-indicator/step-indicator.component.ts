import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss'
})
export class StepIndicatorComponent {
 @Input() steps: { label: string, icon: string }[] = [];
  @Input() currentStep: number = 0;
  @Input() invalidSteps: boolean[] = [];

  constructor() {}

  ngOnInit(): void {}

  getProgressWidth(): string {
    return `${(this.currentStep / (this.steps.length - 1)) * 100}%`;
  }
}
