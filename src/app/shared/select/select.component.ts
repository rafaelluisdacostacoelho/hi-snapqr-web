import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = 'Selecione uma opção';
  @Input() primaryColor: string = '#007BFF';
  @Input() options: { value: string, label: string }[] = [];
  @Input() defaultValue: string = ''; // Novo Input para valor padrão

  selectedValue: string = '';
  selectedLabel: string = ''; // 🔹 Agora armazenamos o label
  showModal: boolean = false;

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  ngOnInit(): void {
    if (this.defaultValue) {
      this.setSelectedValue(this.defaultValue);
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  selectOption(value: string): void {
    this.setSelectedValue(value);
    this.onChange(value);
    this.closeModal();
  }

  setSelectedValue(value: string): void {
    this.selectedValue = value;
    this.selectedLabel = this.getLabelForValue(value);
  }

  getLabelForValue(value: string): string {
    const option = this.options.find(opt => opt.value === value);
    return option ? option.label : 'Selecione...';
  }

  writeValue(value: string): void {
    if (value) {
      this.setSelectedValue(value);
    } else if (this.defaultValue) {
      this.setSelectedValue(this.defaultValue);
      this.onChange(this.defaultValue);
    } else {
      this.selectedLabel = 'Selecione...';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }
}
