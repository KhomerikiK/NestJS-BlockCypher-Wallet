"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const getWallet_dto_1 = require("../dto/getWallet.dto");
const createTransaction_dto_1 = require("../dto/createTransaction.dto");
const helper_1 = require("../helpers/helper");
const wallet_service_1 = require("../wallet/wallet.service");
var bitcoin = require("bitcoinjs-lib");
var bigi = require("bigi");
var buffer = require('buffer');
let TransactionService = class TransactionService {
    constructor(httpService, walletService) {
        this.httpService = httpService;
        this.walletService = walletService;
    }
    async createTransaction(createTransactionDto) {
        try {
            let getWalletDto = new getWallet_dto_1.GetWalletDto();
            let coin = createTransactionDto.coin;
            getWalletDto = {
                coin: coin,
                wallet_name: createTransactionDto.wallet_name,
            };
            let addressesResposnse = await this.walletService.getWalletAddresses(getWalletDto);
            if (addressesResposnse.status) {
                const endpoint = 'txs/new';
                const url = helper_1.Helper.buildApiUrl(coin, endpoint);
                const PostData = {
                    inputs: [{ addresses: ['mrYHxkvTegFe5AumwWaBZnLavPnN6iNFAs'] }],
                    outputs: [{ addresses: [createTransactionDto.address], value: parseFloat(createTransactionDto.amount) }]
                };
                const result = await this.httpService.post(url, JSON.stringify(PostData)).toPromise();
                return { status: 1, data: result.data };
            }
            return { status: 0, data: addressesResposnse.data };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
    async signTransaction(tmptx, coin, private_key) {
        try {
            var keys = new bitcoin.ECPair(bigi.fromHex(private_key));
            tmptx.pubkeys = [];
            tmptx.signatures = tmptx.tosign.map(function (tosign, n) {
                tmptx.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
                return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
            });
            return { status: 1, data: tmptx };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
    async sendTransaction(createTransactionDto) {
        try {
            const createdTx = await this.createTransaction(createTransactionDto);
            if (createdTx.status) {
                const tmptx = createdTx.data;
                const private_key = createTransactionDto.private_key;
                const coin = createTransactionDto.coin;
                const signedTransaction = await this.signTransaction(tmptx, coin, private_key);
                if (signedTransaction.status) {
                    const endpoint = 'txs/send';
                    const url = helper_1.Helper.buildApiUrl(coin, endpoint);
                    const result = await this.httpService.post(url, JSON.stringify(signedTransaction.data)).toPromise();
                    return { status: 1, data: result.data };
                }
                return signedTransaction;
            }
            return createdTx;
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
};
TransactionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        wallet_service_1.WalletService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map