import { Router } from 'express';

import ListTransactionService from './services/ListTransactionService';
import CreateTrasactionService from './services/CreateTransactionService';
import TransactionsRepository from './repositories/TransactionsRepository';
import Transaction from './models/Transaction';

const routes = Router();

const transactionsRepository = new TransactionsRepository();
const listTransactionService = new ListTransactionService(
  transactionsRepository,
);
const createTransactionServcie = new CreateTrasactionService(
  transactionsRepository,
);

routes.get('/transactions', (request, response) => {
  const transactions = listTransactionService.execute();

  return response.json(transactions);
});
routes.post('/transactions', (request, response) => {
  try {
    const { title, type, value }: Omit<Transaction, 'id'> = request.body;

    const transaction = createTransactionServcie.execute({
      title,
      type,
      value,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default routes;
