import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-qrcode-type-pix',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './qrcode-type-pix.component.html',
  styleUrl: './qrcode-type-pix.component.scss'
})
export class QRCodeTypePixComponent implements OnInit {
  pixForm!: FormGroup;

  @Output() formData = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pixForm = this.formBuilder.group({
      pixKey: ['', [Validators.required, Validators.minLength(5)]],
      receiverName: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      message: ['']
    });

    this.pixForm.valueChanges.subscribe(() => {
      this.emitFormData();
    });
  }

  emitFormData() {
    if (this.pixForm.valid) {
      this.formData.emit(this.pixForm.value);
    }
  }
}
