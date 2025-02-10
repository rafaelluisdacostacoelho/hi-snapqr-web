import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss'
})
export class StepIndicatorComponent {
  @Input() steps: string[] = [];
  @Input() currentStep = 0;
  @Input() invalidSteps: boolean[] = [];
}
