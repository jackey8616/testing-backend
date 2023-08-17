import express, { Express, Request, Response } from 'express';

import { Currency, CurrencyService } from './service';

const application: Express = express();
const currencyService: CurrencyService = new CurrencyService();

type ExchangeRateRequestDTO = {
  source: Currency;
  target: Currency;
  amount: string;
};

application.get('/exchange', (req: Request, res: Response) => {
  try {
    const { query } = req;
    const { source, target, amount: amountString }: ExchangeRateRequestDTO = query as ExchangeRateRequestDTO;
    if (!currencyService.isValidCurrency(source) || !currencyService.isValidCurrency(target)) {
      throw new SyntaxError(`Incorrect source or target currency: ${source} / ${target}`);
    }

    const amountNumber = currencyService.currencyStringToNumber(amountString);
    const exchanged = currencyService.exchange(source, target, amountNumber);
    const formatedExchanged = currencyService.currencyNumberToString(exchanged);

    res
      .type('application/json')
      .status(200)
      .json({
        msg: 'success',
        amount: formatedExchanged,
      });
  } catch (err) {
    res.type('application/json');
    if (err instanceof SyntaxError) {
      res.status(400).json({
        msg: 'syntax_error',
        description: err.message,
      });
    } else {
      console.error(err);
      res.status(500).json({ msg: 'error' });
    }
  }
});

application.use((request: Request, response: Response) => {
  response.type('text/plain');
  response.status(404);
  response.send('Page is not found.');
});

export default application;
