import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';
export declare class TransactionController {
    protected readonly transactionService: TransactionService;
    constructor(transactionService: TransactionService);
    sendTransaction(createTransactionDto: CreateTransactionDto): Promise<{
        status: number;
        data: any;
    }>;
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<{
        status: number;
        data: any;
    }>;
}
