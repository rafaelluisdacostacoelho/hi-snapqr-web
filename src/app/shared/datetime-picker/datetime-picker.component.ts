import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datetime-picker',
  imports: [CommonModule, FormsModule],
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Selecione Data e Hora';
  @Input() primaryColor: string = '#007BFF';
  @Input() locale: string = 'pt-BR';

  selectedDate: string = ''; // Armazena a data selecionada (YYYY-MM-DD)
  selectedTime: string = ''; // Armazena a hora selecionada (HH:mm)
  showModal: boolean = false;

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  constructor() { }

  ngOnInit(): void { }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.updateValue();
  }

  onTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedTime = input.value;
    this.updateValue();
  }

  updateValue(): void {
    if (this.selectedDate && this.selectedTime) {
      const formattedValue = `${this.selectedDate} ${this.selectedTime}`;
      this.onChange(formattedValue);
    }
  }

  confirmSelection(): void {
    this.closeModal();
  }

  writeValue(value: string): void {
    if (value) {
      const [date, time] = value.split(' ');
      this.selectedDate = date || '';
      this.selectedTime = time || '';
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
