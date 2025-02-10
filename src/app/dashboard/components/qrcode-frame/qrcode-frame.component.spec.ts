import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeFrameComponent } from './qrcode-frame.component';

describe('QRCodeFrameComponent', () => {
  let component: QRCodeFrameComponent;
  let fixture: ComponentFixture<QRCodeFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
