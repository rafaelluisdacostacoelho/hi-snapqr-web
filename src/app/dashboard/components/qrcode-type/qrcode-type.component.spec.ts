import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeTypeComponent } from './qrcode-type.component';

describe('QRCodeTypeComponent', () => {
  let component: QRCodeTypeComponent;
  let fixture: ComponentFixture<QRCodeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
