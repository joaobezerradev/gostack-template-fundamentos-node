import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  title: string;
  value: number;
  type: string;
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface ResponseDTO {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  private balanceResult(transactions: Transaction[]): Balance {
    let income = 0;
    let outcome = 0;
    transactions.map(transaction =>
      transaction.type === 'income'
        ? (income += transaction.value)
        : (outcome += transaction.value),
    );
    const total: number = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public execute(): ResponseDTO {
    const transactions = this.transactionRepository.all();

    const balance = this.balanceResult(transactions);

    return {
      transactions,
      balance,
    };
  }
}
export default ListTransactionService;
