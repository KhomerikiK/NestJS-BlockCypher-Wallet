import { Controller, Post, Param, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';

@Controller('transaction')
export class TransactionController {
    constructor(protected readonly transactionService: TransactionService){}

    @Post('/send')
    async sendTransaction(@Body() createTransactionDto: CreateTransactionDto){
        return await this.transactionService.sendTransaction(createTransactionDto);
    }

    @Post('/create')
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto){
        return await this.transactionService.createTransaction(createTransactionDto);
    }
    
}
