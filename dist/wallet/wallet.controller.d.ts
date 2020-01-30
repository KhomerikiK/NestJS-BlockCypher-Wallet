import { WalletService } from './wallet.service';
import { CreateAddressDto } from '../dto/createAddress.dto';
import { CreateWalletDto } from '../dto/createWallet.dto';
export declare class WalletController {
    protected readonly WalletService: WalletService;
    constructor(WalletService: WalletService);
    createWallet(createWalletDto: CreateWalletDto): Promise<{
        status: number;
        data: any;
    }>;
    createAddress(createAddressDto: CreateAddressDto): Promise<{
        status: number;
        data: any;
    }>;
}
