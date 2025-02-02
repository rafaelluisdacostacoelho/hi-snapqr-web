import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarService } from '../../services/snackbar.service';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let snackbarServiceMock: Partial<SnackbarService>;
  let snackbarState$: BehaviorSubject<{ message: string; type: 'success' | 'error' | 'warning' } | null>;

  beforeEach(async () => {
    // 🔥 Criamos um BehaviorSubject para simular mudanças no SnackbarService
    snackbarState$ = new BehaviorSubject<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

    snackbarServiceMock = {
      snackbarState$: snackbarState$.asObservable(), // 🔥 Simulando o Observable real
      showMessage: jasmine.createSpy('showMessage'),
    };

    await TestBed.configureTestingModule({
      imports: [SnackbarComponent], // 🔥 Importa o componente standalone
      providers: [
        { provide: SnackbarService, useValue: snackbarServiceMock }, // 🔥 Usa o mock do serviço
        { provide: ChangeDetectorRef, useValue: { detectChanges: jasmine.createSpy() } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir a mensagem correta quando show() for chamado', () => {
    component.message = 'Teste de mensagem';
    component.type = 'success';
    component.show();

    expect(component.isVisible).toBeTrue();
    expect(component.message).toBe('Teste de mensagem');
    expect(component.type).toBe('success');
  });

  it('Deve esconder o snackbar quando hide() for chamado', () => {
    component.show();
    component.hide();

    expect(component.isVisible).toBeFalse();
  });

  it('Deve receber a mensagem do SnackbarService e exibi-la', () => {
    snackbarState$.next({ message: 'Erro ao carregar', type: 'error' }); // 🔥 Simulando erro no snackbar
    fixture.detectChanges(); // 🔥 Atualiza o componente

    expect(component.isVisible).toBeTrue();
    expect(component.message).toBe('Erro ao carregar');
    expect(component.type).toBe('error');
  });
});
