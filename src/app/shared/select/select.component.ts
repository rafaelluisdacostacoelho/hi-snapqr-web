import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
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
  @Input() options: { value: number, label: string }[] = [];
  @Input() defaultValue: number = 0;
  @Output() selectionChange = new EventEmitter<number>();

  selectedValue: number = 0;
  selectedLabel: string = '';
  showModal: boolean = false;

  onChange: (value: number) => void = () => { };
  onTouched: () => void = () => { };

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (this.defaultValue) {
      this.setSelectedValue(this.defaultValue);
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  selectOption(value: number): void {
    this.setSelectedValue(value);
    this.onChange(value);
    this.selectionChange.emit(value);
    this.showModal = false;
  }

  setSelectedValue(value: number): void {
    this.selectedValue = value;
    this.selectedLabel = this.getLabelForValue(value);
  }

  getLabelForValue(value: number): string {
    const option = this.options.find(opt => opt.value === value);
    return option ? option.label : 'Selecione...';
  }

  writeValue(value: number): void {
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

  @HostListener('document:click', ['$event'])
  closeModal(event: Event): void {
    if (this.showModal && !this.elementRef.nativeElement.contains(event.target)) {
      this.showModal = false;
    }
  }
}
