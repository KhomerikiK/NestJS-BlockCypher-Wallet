var request = require('request');
var xtend = require('xtend');
const URL_ROOT = 'https://api.blockcypher.com/v1/';
var Blockcy = function (coin, chain, token) {
    this.coin = coin;
    this.chain = chain;
    this.token = token;
};
module.exports = Blockcy;
Blockcy.prototype._get = function (url, params, cb) {
    var urlr = URL_ROOT + this.coin + '/' + this.chain + url;
    params = xtend(params, { token: this.token });
    request.get({
        url: urlr,
        strictSSL: true,
        json: true,
        qs: params
    }, function (error, response, body) {
        if (!error || response.statusCode !== 200) {
            cb(error, body || {});
        }
        else {
            cb(null, body);
        }
    });
};
Blockcy.prototype._post = function (url, params, data, cb) {
    var urlr = URL_ROOT + this.coin + '/' + this.chain + url;
    params = xtend(params, { token: this.token });
    request.post({
        url: urlr,
        strictSSL: true,
        json: true,
        qs: params,
        body: data
    }, function (error, response, body) {
        if (!error || (response.statusCode !== 200 && response.statusCode !== 201)) {
            cb(error, body || {});
        }
        else {
            cb(null, body);
        }
    });
};
Blockcy.prototype._del = function (url, params, cb) {
    var urlr = URL_ROOT + this.coin + '/' + this.chain + url;
    params = xtend(params, { token: this.token });
    request.del({
        url: urlr,
        strictSSL: true,
        json: true,
        qs: params
    }, function (error, response, body) {
        if (!error || response.statusCode !== 204) {
            cb(error, body || {});
        }
        else {
            cb(null, body);
        }
    });
};
Blockcy.prototype.getChain = function (cb) {
    this._get('/', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getBlock = function (hh, params, cb) {
    this._get('/blocks/' + hh, params, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getAddrBal = function (addr, params, cb) {
    this._get('/addrs/' + addr + '/balance', params, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getAddr = function (addr, params, cb) {
    this._get('/addrs/' + addr, params, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getAddrFull = function (addr, params, cb) {
    this._get('/addrs/' + addr + '/full', params, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.genAddr = function (data, cb) {
    this._post('/addrs', {}, data, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.faucet = function (addr, value, cb) {
    this._post('/faucet', {}, { address: addr, amount: value }, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.createWallet = function (data, cb) {
    this._post('/wallets', {}, data, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.createHDWallet = function (data, cb) {
    this._post('/wallets/hd', {}, data, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.listWallets = function (cb) {
    this._get('/wallets', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.listHDWallets = function (cb) {
    this._get('/wallets/hd', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getWallet = function (name, cb) {
    this._get('/wallets/' + name, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getHDWallet = function (name, cb) {
    this._get('/wallets/hd/' + name, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.addAddrWallet = function (name, addrs, cb) {
    this._post('/wallets/' + name + '/addresses', {}, { addresses: addrs }, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getAddrsWallet = function (name, cb) {
    this._get('/wallets/' + name + '/addresses', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getAddrsHDWallet = function (name, cb) {
    this._get('/wallets/hd/' + name + '/addresses', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.delAddrsWallet = function (name, addrs, cb) {
    this._del('/wallets/' + name + '/addresses', { address: addrs.join([';']) }, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.genAddrWallet = function (name, cb) {
    this._post('/wallets/' + name + '/addresses/generate', {}, {}, function (error, body) {
        return cb(error, body);
    });
};
Blockcy.prototype.deriveAddrHDWallet = function (name, params, cb) {
    this._post('/wallets/hd/' + name + '/addresses/derive', params, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.delWallet = function (name, cb) {
    this._del('/wallets/' + name, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.delHDWallet = function (name, cb) {
    this._del('/wallets/hd/' + name, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getTX = function (hash, params, cb) {
    this._get('/txs/' + hash, params, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getUnTXs = function (cb) {
    this._get('/txs', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.newTX = function (tx, cb) {
    this._post('/txs/new', {}, tx, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.sendTX = function (txskel, cb) {
    this._post('/txs/send', {}, txskel, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.pushTX = function (hex, cb) {
    this._post('/txs/push', {}, { tx: hex }, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.decodeTX = function (hex, cb) {
    this._post('/txs/decode', {}, { tx: hex }, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.embedData = function (hex, cb) {
    this._post('/txs/data', {}, { data: hex }, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.microTX = function (micro, cb) {
    this._post('/txs/micro', {}, micro, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getTXConf = function (hash, cb) {
    this._get('/txs/' + hash + '/confidence', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.createPayFwd = function (data, cb) {
    this._post('/payments', {}, data, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.listPayFwds = function (cb) {
    this._get('/payments', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.delPayFwd = function (id, cb) {
    this._del('/payments/' + id, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.createHook = function (data, cb) {
    this._post('/hooks', {}, data, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.listHooks = function (cb) {
    this._get('/hooks', {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.getHook = function (id, cb) {
    this._get('/hooks/' + id, {}, function (error, body) {
        cb(error, body);
    });
};
Blockcy.prototype.delHook = function (id, cb) {
    this._del('/hooks/' + id, {}, function (error, body) {
        cb(error, body);
    });
};
//# sourceMappingURL=bcypher.js.map