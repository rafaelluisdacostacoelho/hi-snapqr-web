import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeTypePixComponent } from './qrcode-type-pix.component';

describe('QRCodeTypePixComponent', () => {
  let component: QRCodeTypePixComponent;
  let fixture: ComponentFixture<QRCodeTypePixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeTypePixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeTypePixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
