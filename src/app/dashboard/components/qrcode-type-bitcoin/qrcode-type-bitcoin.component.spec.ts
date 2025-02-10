import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeAddBitcoinComponent } from './qrcode-type-bitcoin.component';

describe('QRCodeAddBitcoinComponent', () => {
  let component: QRCodeAddBitcoinComponent;
  let fixture: ComponentFixture<QRCodeAddBitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeAddBitcoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeAddBitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
