import { Module, HttpModule} from '@nestjs/common';
import {WalletController} from './wallet/wallet.controller'
import { WalletService } from './wallet/wallet.service';
import { ConfigModule } from '@nestjs/config';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot()
  ],
  controllers: [WalletController, AddressController, TransactionController],
  providers: [WalletService, AddressService, TransactionService],
})
export class AppModule {}
