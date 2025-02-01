import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
   * Transforma um valor numérico em um formato de moeda.
   * @param value O valor numérico a ser formatado.
   * @param currency O código da moeda (ex: 'BRL', 'USD').
   * @param locale O idioma opcional para formatação (ex: 'pt-BR', 'en-US').
   * @returns String formatada no formato de moeda.
   */
  transform(value: number, currency: 'BRL' | 'USD', locale: string = 'pt-BR'): string {
    if (isNaN(value)) {
      return '';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  }
}