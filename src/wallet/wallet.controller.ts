import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {CreateAddressDto} from '../dto/createAddress.dto'
import {CreateWalletDto} from '../dto/createWallet.dto'

@Controller('wallet')
export class WalletController {
    constructor(protected readonly WalletService: WalletService){}


    @Post(':coin/')
    async createWallet(@Param() createWalletDto: CreateWalletDto){
        let resp = await this.WalletService.createWallet(createWalletDto);
        return resp 
    }


    @Post(':coin/:wallet_name/address')
    async createAddress(@Param() createAddressDto: CreateAddressDto){
        let resp = await this.WalletService.generateWalletAddress(createAddressDto);
        return resp 
    }

}
