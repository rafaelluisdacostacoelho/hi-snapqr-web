import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeLogoComponent } from './qrcode-logo.component';

describe('QRCodeLogoComponent', () => {
  let component: QRCodeLogoComponent;
  let fixture: ComponentFixture<QRCodeLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
