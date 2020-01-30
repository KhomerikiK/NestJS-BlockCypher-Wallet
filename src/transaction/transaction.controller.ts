import { Controller, Post, Param, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';

@Controller('transaction')
export class TransactionController {
    constructor(protected readonly transactionService: TransactionService){}

    /** 
     * create and send transaction 
     * @example transaction/send
     * @body 'coin' cryoto coin
     * @body 'wallet_name' name of the wallet to send from
     * @body 'address' address to send to
     * @body 'private_key' your address private_key
     * @body 'amount' in baseUnits
     * @returns Object 
    */
    @Post('/send')
    async sendTransaction(@Body() createTransactionDto: CreateTransactionDto){
        return await this.transactionService.sendTransaction(createTransactionDto);
    }

    /** 
     * create transaction object to get information on it
     * @example transaction/create
     * @body 'coin' cryoto coin
     * @body 'wallet_name' name of the wallet to send from
     * @body 'address' address to send to
     * @body 'private_key' your address private_key
     * @body 'amount' in baseUnits
     * @returns Object 
    */
    @Post('/create')
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto){
        return await this.transactionService.createTransaction(createTransactionDto);
    }
    
}
