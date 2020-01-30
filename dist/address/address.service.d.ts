import { HttpService } from '@nestjs/common';
import { GetAddressBalanceDto } from 'src/dto/getAddressBalance.dto';
export declare class AddressService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getBalance(getAddressBalanceDto: GetAddressBalanceDto): Promise<{
        status: number;
        data: any;
    }>;
}
