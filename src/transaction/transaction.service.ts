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
     * createTransaction
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
     * signTransaction
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
     * name
     */
    public async sendTransaction(createTransactionDto: CreateTransactionDto) {
        try {
            const createdTx = await this.createTransaction(createTransactionDto);
            if (createdTx.status) {
    
                const tmptx = createdTx.data;
                const private_key = createTransactionDto.private_key;
                const coin = createTransactionDto.coin;
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
