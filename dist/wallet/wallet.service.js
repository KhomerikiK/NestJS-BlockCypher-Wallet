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
const helper_1 = require("../helpers/helper");
const createWallet_dto_1 = require("../dto/createWallet.dto");
const createAddress_dto_1 = require("../dto/createAddress.dto");
const addressWebhook_dto_1 = require("../dto/addressWebhook.dto");
const getWallet_dto_1 = require("../dto/getWallet.dto");
let WalletService = class WalletService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async createWallet(createWalletDto) {
        try {
            let name = helper_1.Helper.generateRandomId(25);
            let coin = createWalletDto.coin;
            let PostData = { "name": name, "addresses": [] };
            let endpoint = 'wallets';
            let url = helper_1.Helper.buildApiUrl(coin, endpoint);
            const result = await this.httpService.post(url, JSON.stringify(PostData)).toPromise();
            return { status: 1, data: result.data };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
    async getWalletAddresses(getWalletDto) {
        try {
            let endpoint = 'wallets/' + getWalletDto.wallet_name + '/addresses';
            let url = helper_1.Helper.buildApiUrl(getWalletDto.coin, endpoint);
            const result = await this.httpService.get(url).toPromise();
            return { status: 1, data: result.data };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
    async generateWalletAddress(createAddressDto) {
        try {
            let coin = createAddressDto.coin;
            let PostData = { "name": createAddressDto.wallet_name, "addresses": [] };
            let endpoint = 'wallets/alice/addresses/generate';
            let url = helper_1.Helper.buildApiUrl(coin, endpoint);
            let addressWebhookDto = new addressWebhook_dto_1.AddressWebhookDto();
            const result = await this.httpService.post(url, JSON.stringify(PostData)).toPromise();
            let address = result.data.address;
            addressWebhookDto = {
                coin: coin,
                event: 'unconfirmed-tx',
                address: address,
                url: createAddressDto.callback_url
            };
            this.addAddressWebhook(addressWebhookDto);
            addressWebhookDto = {
                coin: coin,
                event: 'tx-confirmation',
                address: address,
                url: createAddressDto.confirmation_callback_url
            };
            this.addAddressWebhook(addressWebhookDto);
            return { status: 1, data: result.data };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
    async addAddressWebhook(addressWebhookDto) {
        try {
            let coin = addressWebhookDto.coin;
            let PostData = addressWebhookDto;
            let endpoint = 'hooks';
            let url = helper_1.Helper.buildApiUrl(coin, endpoint);
            const result = await this.httpService.post(url, JSON.stringify(PostData)).toPromise();
            return { status: 1, data: result.data };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
};
WalletService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map