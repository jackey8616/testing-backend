import { multiply, round, number as parseNumber } from 'mathjs';

export type Currency = 'USD' | 'JPY' | 'TWD';

export class CurrencyService {
  public readonly currencyConfig: Record<Currency, Record<Currency, number>> = {
    'TWD': {
      'TWD': 1,
      'JPY': 3.669,
      'USD': 0.03281,
    },
    'JPY': {
      'TWD': 0.26956,
      'JPY': 1,
      'USD': 0.00885,
    },
    'USD': {
      'TWD': 30.444,
      'JPY': 111.801,
      'USD': 1,
    },
  };

  isValidCurrency(target: string): boolean {
    switch (target) {
      case 'USD':
      case 'JPY':
      case 'TWD':
        return true;
      default:
        return false;
    }
  }

  exchange(source: Currency, target: Currency, amount: number): number {
    const targetRate = this.currencyConfig[source][target];
    return round(multiply(targetRate, amount) * 100) / 100;
  }
  
  currencyStringToNumber(amountString: string): number {
    const amount = amountString.replace(/\$/, '').replace(/\,/, '');
    return parseNumber(amount);
  }

  currencyNumberToString(amountNumber: number): string {
    return `$${new Intl.NumberFormat(
      'en-US',
      {
        maximumFractionDigits: 3,
      },
    ).format(amountNumber)}`;
  }
}
