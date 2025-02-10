import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeTypeBitcoinComponent } from './qrcode-type-bitcoin.component';

describe('QRCodeTypeBitcoinComponent', () => {
  let component: QRCodeTypeBitcoinComponent;
  let fixture: ComponentFixture<QRCodeTypeBitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeTypeBitcoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeTypeBitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
