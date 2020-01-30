"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const wallet_controller_1 = require("./wallet/wallet.controller");
const wallet_service_1 = require("./wallet/wallet.service");
const config_1 = require("@nestjs/config");
const address_controller_1 = require("./address/address.controller");
const address_service_1 = require("./address/address.service");
const transaction_controller_1 = require("./transaction/transaction.controller");
const transaction_service_1 = require("./transaction/transaction.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule,
            config_1.ConfigModule.forRoot()
        ],
        controllers: [wallet_controller_1.WalletController, address_controller_1.AddressController, transaction_controller_1.TransactionController],
        providers: [wallet_service_1.WalletService, address_service_1.AddressService, transaction_service_1.TransactionService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map