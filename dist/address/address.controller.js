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
const getAddressBalance_dto_1 = require("../dto/getAddressBalance.dto");
const address_service_1 = require("./address.service");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async createTransaction(getAddressBalanceDto) {
        console.log('controller');
        let resp = await this.addressService.getBalance(getAddressBalanceDto);
        return resp;
    }
};
__decorate([
    common_1.Get(':address/:coin'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getAddressBalance_dto_1.GetAddressBalanceDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "createTransaction", null);
AddressController = __decorate([
    common_1.Controller('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map