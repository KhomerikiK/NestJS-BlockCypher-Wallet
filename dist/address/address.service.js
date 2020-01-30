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
const getAddressBalance_dto_1 = require("../dto/getAddressBalance.dto");
const helper_1 = require("../helpers/helper");
let AddressService = class AddressService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getBalance(getAddressBalanceDto) {
        try {
            const endpoint = 'addrs/' + getAddressBalanceDto.address + '/balance';
            let url = helper_1.Helper.buildApiUrl(getAddressBalanceDto.coin, endpoint);
            const result = await this.httpService.get(url).toPromise();
            return { status: 1, data: result.data };
        }
        catch (error) {
            return { status: 0, data: error.message };
        }
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map