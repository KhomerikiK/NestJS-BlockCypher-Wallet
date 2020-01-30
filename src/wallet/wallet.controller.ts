import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {CreateAddressDto} from '../dto/createAddress.dto'
import {CreateWalletDto} from '../dto/createWallet.dto'

@Controller('wallet')
export class WalletController {
    constructor(protected readonly WalletService: WalletService){}


    /**
     * route for creating wallet on spefied coin
     * @example wallet/btc
     * @returns Object 
    */
    @Post(':coin/')
    async createWallet(@Param() createWalletDto: CreateWalletDto){
        let resp = await this.WalletService.createWallet(createWalletDto);
        return resp 
    }

    /**
     * route for creating address and its webhook on wallet
     * @example wallet/btc/your_wallet_name/address
     * @returns Object 
    */
    @Post(':coin/:wallet_name/address')
    async createAddress(@Param() createAddressDto: CreateAddressDto){
        let resp = await this.WalletService.generateWalletAddress(createAddressDto);
        return resp 
    }

}
