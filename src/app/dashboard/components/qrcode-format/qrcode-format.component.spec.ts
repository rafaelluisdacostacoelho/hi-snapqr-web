import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeFormatComponent } from './qrcode-format.component';

describe('QRCodeFormatComponent', () => {
  let component: QRCodeFormatComponent;
  let fixture: ComponentFixture<QRCodeFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
