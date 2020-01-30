import { HttpService, Injectable, Inject } from '@nestjs/common';
import { Helper } from "../helpers/helper";
import { CreateWalletDto } from 'src/dto/createWallet.dto';
import { CreateAddressDto } from 'src/dto/createAddress.dto';
import { AddressWebhookDto } from 'src/dto/addressWebhook.dto';
import { GetWalletDto } from 'src/dto/getWallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly httpService: HttpService) {}

    /**
     * createWallet
     */
    public async createWallet(createWalletDto: CreateWalletDto) {
      try {
        let name = Helper.generateRandomId(25);
        let coin = createWalletDto.coin;
        let PostData = {"name": name, "addresses": []};
        let endpoint = 'wallets'
        let url = Helper.buildApiUrl(coin, endpoint);
        
        const result = await this.httpService.post( url, JSON.stringify(PostData)).toPromise();

        return {status:1, data: result.data};
      } catch (error) {
        return {status:0, data: error.message};
      }
    }

    /**
     * getWallet Addresses
     */
    public async getWalletAddresses(getWalletDto: GetWalletDto) {
      try {

        let endpoint = 'wallets/' + getWalletDto.wallet_name + '/addresses';
        let url = Helper.buildApiUrl(getWalletDto.coin, endpoint);
        const result = await this.httpService.get( url ).toPromise();
        return {status:1, data: result.data};

      } catch (error) {
        return {status:0, data: error.message};
      }
     

    }
    
    

    /**
     * generateWalletAddress
     */
    public async generateWalletAddress(createAddressDto: CreateAddressDto) {
      try {
        let coin = createAddressDto.coin;
        let PostData = {"name": createAddressDto.wallet_name, "addresses": []};
        let endpoint = 'wallets/alice/addresses/generate'
        let url = Helper.buildApiUrl(coin, endpoint);
        let addressWebhookDto = new AddressWebhookDto();
        
        const result = await this.httpService.post( url, JSON.stringify(PostData)).toPromise();
        let address = result.data.address;
       

        addressWebhookDto={
          coin:coin,
          event:'unconfirmed-tx',
          address: address,
          url: createAddressDto.callback_url
        }
        this.addAddressWebhook(addressWebhookDto);

        addressWebhookDto={
          coin:coin,
          event:'tx-confirmation',
          address: address,
          url: createAddressDto.confirmation_callback_url
        }

        this.addAddressWebhook(addressWebhookDto);
        return {status:1, data: result.data};

      } catch (error) {
        return {status:0, data: error.message};
      }
    }


    /**
     * generateWalletAddress
     */
    public async addAddressWebhook(addressWebhookDto: AddressWebhookDto) {

      try {
        let coin = addressWebhookDto.coin;
        let PostData =addressWebhookDto;
        let endpoint = 'hooks'
        let url = Helper.buildApiUrl(coin, endpoint);
      
        const result = await this.httpService.post( url, JSON.stringify(PostData)).toPromise();


        return {status:1, data: result.data};
      } catch (error) {
        return {status:0, data: error.message};
      }

    }
}
