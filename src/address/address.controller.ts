import { Controller, Post, Param, Get } from '@nestjs/common';
import { GetAddressBalanceDto } from 'src/dto/getAddressBalance.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

    constructor(protected readonly addressService: AddressService){}

    @Get(':address/:coin')
    async createTransaction(@Param() getAddressBalanceDto: GetAddressBalanceDto){
        console.log('controller');
        
        let resp = await this.addressService.getBalance(getAddressBalanceDto);
        return resp 
    }
}
