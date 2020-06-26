import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import ListTransactionService from './ListTransactionService';

interface RequestDTO {
  title: string;
  type: string;
  value: number;
}

class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    const listTransactions = new ListTransactionService(
      this.transactionRepository,
    );
    const { total } = listTransactions.execute().balance;

    if (type === 'outcome' && value > total) {
      throw Error('Não pode extrapolar o limite!');
    }
    const transaction = this.transactionRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}
export default CreateTransactionService;
