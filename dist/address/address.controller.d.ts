import { GetAddressBalanceDto } from 'src/dto/getAddressBalance.dto';
import { AddressService } from './address.service';
export declare class AddressController {
    protected readonly addressService: AddressService;
    constructor(addressService: AddressService);
    createTransaction(getAddressBalanceDto: GetAddressBalanceDto): Promise<{
        status: number;
        data: any;
    }>;
}
