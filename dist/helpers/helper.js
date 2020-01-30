"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static generateRandomId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static printResponse(err, data) {
        if (err !== null) {
            return err;
        }
        else {
            return data;
        }
    }
    static buildApiUrl(coin, endpoint) {
        let url = process.env.BLOCKCYPHER_URL + '/' + process.env.API_VERSION + '/' + coin + '/' + process.env.API_ENV + '/' + endpoint + '?token=' + process.env.API_TOKEN;
        return url;
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map