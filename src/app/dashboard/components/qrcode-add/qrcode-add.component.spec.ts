import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeAddComponent } from './qrcode-add.component';

describe('QrcodeAddComponent', () => {
  let component: QrcodeAddComponent;
  let fixture: ComponentFixture<QrcodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
