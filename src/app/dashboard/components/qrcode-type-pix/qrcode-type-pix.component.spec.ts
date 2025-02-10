import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeAddPixComponent } from './qrcode-type-pix.component';

describe('QrcodeAddPixComponent', () => {
  let component: QRCodeAddPixComponent;
  let fixture: ComponentFixture<QRCodeAddPixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeAddPixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeAddPixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
