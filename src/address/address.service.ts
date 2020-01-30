import { Injectable, HttpService } from '@nestjs/common';
import { GetAddressBalanceDto } from 'src/dto/getAddressBalance.dto';
import { Helper } from 'src/helpers/helper';

@Injectable()
export class AddressService {
    constructor(private readonly httpService: HttpService) {}
    /**
     * getWallet
     */
    public async getBalance(getAddressBalanceDto: GetAddressBalanceDto) {
        try {
            const endpoint = 'addrs/'+getAddressBalanceDto.address+'/balance'
            let url = Helper.buildApiUrl(getAddressBalanceDto.coin, endpoint);
            const result = await this.httpService.get(url).toPromise();
            return {status: 1, data: result.data}  
        } catch (error) {
            return {status: 0, data: error.message}  
        }
        
    }
}
