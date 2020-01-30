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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const createAddress_dto_1 = require("../dto/createAddress.dto");
const createWallet_dto_1 = require("../dto/createWallet.dto");
let WalletController = class WalletController {
    constructor(WalletService) {
        this.WalletService = WalletService;
    }
    async createWallet(createWalletDto) {
        let resp = await this.WalletService.createWallet(createWalletDto);
        return resp;
    }
    async createAddress(createAddressDto) {
        let resp = await this.WalletService.generateWalletAddress(createAddressDto);
        return resp;
    }
};
__decorate([
    common_1.Post(':coin/'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createWallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createWallet", null);
__decorate([
    common_1.Post(':coin/:wallet_name/address'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAddress_dto_1.CreateAddressDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createAddress", null);
WalletController = __decorate([
    common_1.Controller('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map