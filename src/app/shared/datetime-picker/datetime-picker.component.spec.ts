import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickerComponent } from './datetime-picker.component';

describe('DatetimePickerComponent', () => {
  let component: DatetimePickerComponent;
  let fixture: ComponentFixture<DatetimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
