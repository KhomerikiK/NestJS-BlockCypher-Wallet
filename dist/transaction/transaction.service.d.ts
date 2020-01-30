import { HttpService } from '@nestjs/common';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';
import { WalletService } from 'src/wallet/wallet.service';
export declare class TransactionService {
    private readonly httpService;
    private readonly walletService;
    constructor(httpService: HttpService, walletService: WalletService);
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<{
        status: number;
        data: any;
    }>;
    signTransaction(tmptx: any, coin: any, private_key: any): Promise<{
        status: number;
        data: any;
    }>;
    sendTransaction(createTransactionDto: CreateTransactionDto): Promise<{
        status: number;
        data: any;
    }>;
}
