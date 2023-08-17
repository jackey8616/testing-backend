import { CurrencyService } from './currency';

describe('CurrencyService', () => {
  describe('#exchange', () => {
    it('Should calculate correct amount with round to up', () => {
      expect(new CurrencyService().exchange('TWD', 'JPY', 1.356)).toBe(4.98);
      expect(new CurrencyService().exchange('TWD', 'JPY', 2147483647)).toBe(7879117500.84);
    });

    it('Should calculate correct amount with round to down', () => {
      expect(new CurrencyService().exchange('TWD', 'USD', 1.356)).toBe(0.04);
      expect(new CurrencyService().exchange('TWD', 'USD', 2147483647)).toBe(70458938.46);
    });
  });

  describe('#currencyNumberToString', () => {
    it('Should convert a currency number to a string', () => {
      const service = new CurrencyService();

      expect(service.currencyNumberToString(3.451)).toBe('$3.451');
      expect(service.currencyNumberToString(3.4520)).toBe('$3.452');
      expect(service.currencyNumberToString(2147483647.2147483647)).toBe('$2,147,483,647.215');
    });
  });

  describe('#currencyStringToNumber', () => {
    it('Should convert a currency string to a number', () => {
      const service = new CurrencyService();

      expect(service.currencyStringToNumber('$3.451')).toBe(3.451);
      expect(service.currencyStringToNumber('$3.4520')).toBe(3.452);
      expect(service.currencyStringToNumber('$2147483647.2147483647')).toBe(2147483647.2147483647);
    });
  });
});
