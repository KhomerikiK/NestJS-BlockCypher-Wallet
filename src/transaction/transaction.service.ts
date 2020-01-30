import { Injectable, HttpService } from '@nestjs/common';
import { GetWalletDto } from 'src/dto/getWallet.dto';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';
import { Helper } from 'src/helpers/helper';
import { WalletService } from 'src/wallet/wallet.service';
var bitcoin = require("bitcoinjs-lib");
var bigi    = require("bigi");
var buffer  = require('buffer');

@Injectable()
export class TransactionService {
    constructor(
        private readonly httpService: HttpService,
        private readonly walletService: WalletService,
    ) {}



    /**
     * create Transaction object to get information and then use in send transaction
     */
    public async createTransaction(createTransactionDto: CreateTransactionDto) {
        try {
            let getWalletDto = new GetWalletDto();
            let coin = createTransactionDto.coin;
            getWalletDto = {
              coin:coin,
              wallet_name: createTransactionDto.wallet_name,
            };
            let addressesResposnse = await this.walletService.getWalletAddresses(getWalletDto);
            if (addressesResposnse.status) {
              const endpoint = 'txs/new'
              const url = Helper.buildApiUrl(coin, endpoint); 
              const PostData =  {
                inputs: [{addresses: ['mrYHxkvTegFe5AumwWaBZnLavPnN6iNFAs']}],
                outputs: [{addresses: [createTransactionDto.address], value: parseFloat(createTransactionDto.amount)}]
              }   
              const result = await this.httpService.post( url, JSON.stringify(PostData)).toPromise();                  
              return {status:1, data: result.data};
            }
            return {status:0, data: addressesResposnse.data};
          } catch (error) {
            return {status:0, data: error.message};
          }
    }


    /**
     * sign created transaction
     * @param tmptx created transaction object
     * @param coin string abreviation of the crypto coin
     * @param private_key private key of the address
     * @returns signed transaction object if the status is 1
     */
    public async signTransaction(tmptx, coin, private_key) {
        
        try {

            var keys = new bitcoin.ECPair(bigi.fromHex(private_key));
            tmptx.pubkeys = [];
            tmptx.signatures = tmptx.tosign.map(function (tosign, n) {
                tmptx.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
                return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
            });
            
            return {status:1, data: tmptx};

        } catch (error) {
            return {status:0, data: error.message};
        }
        

    }


    /**
     * send signed transaction
     * @param createTransactionDto data transfer object declared in dto folder
     * @returns sent transaction object if status is 1
     */
    public async sendTransaction(createTransactionDto: CreateTransactionDto) {
        try {
            const createdTx = await this.createTransaction(createTransactionDto);
            //check if created transaction status
            if (createdTx.status) {
    
                const tmptx = createdTx.data;
                const private_key = createTransactionDto.private_key;
                const coin = createTransactionDto.coin;
                //send signed transaction
                const  signedTransaction = await this.signTransaction(tmptx, coin, private_key);
                if (signedTransaction.status) {
                    const endpoint = 'txs/send'
                    const url = Helper.buildApiUrl(coin, endpoint); 
                    const result = await this.httpService.post( url, JSON.stringify(signedTransaction.data)).toPromise();
                    return {status: 1, data:result.data}
                }
                return signedTransaction
            }
            return createdTx
        } catch (error) {
            return {status: 0, data: error.message}
            
        }
       
    }
}
