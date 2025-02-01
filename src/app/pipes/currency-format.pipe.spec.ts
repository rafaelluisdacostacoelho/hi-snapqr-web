import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  const pipe = new CurrencyFormatPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve formatar um valor em BRL', () => {
    expect(pipe.transform(4, 'BRL')).toBe('R$ 4,00');
  });

  it('deve formatar um valor em USD', () => {
    expect(pipe.transform(4, 'USD', 'en-US')).toBe('$4.00');
  });

  it('deve retornar vazio para valores inválidos', () => {
    expect(pipe.transform(NaN, 'BRL')).toBe('');
  });
});
