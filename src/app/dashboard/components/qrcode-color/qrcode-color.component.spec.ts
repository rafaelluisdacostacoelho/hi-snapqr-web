import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeColorComponent } from './qrcode-color.component';

describe('QRCodeColorComponent', () => {
  let component: QRCodeColorComponent;
  let fixture: ComponentFixture<QRCodeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
