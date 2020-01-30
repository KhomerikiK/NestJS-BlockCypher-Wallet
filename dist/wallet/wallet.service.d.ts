import { HttpService } from '@nestjs/common';
import { CreateWalletDto } from 'src/dto/createWallet.dto';
import { CreateAddressDto } from 'src/dto/createAddress.dto';
import { AddressWebhookDto } from 'src/dto/addressWebhook.dto';
import { GetWalletDto } from 'src/dto/getWallet.dto';
export declare class WalletService {
    private readonly httpService;
    constructor(httpService: HttpService);
    createWallet(createWalletDto: CreateWalletDto): Promise<{
        status: number;
        data: any;
    }>;
    getWalletAddresses(getWalletDto: GetWalletDto): Promise<{
        status: number;
        data: any;
    }>;
    generateWalletAddress(createAddressDto: CreateAddressDto): Promise<{
        status: number;
        data: any;
    }>;
    addAddressWebhook(addressWebhookDto: AddressWebhookDto): Promise<{
        status: number;
        data: any;
    }>;
}
