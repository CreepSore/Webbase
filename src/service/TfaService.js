"use strict";
let JsSha = require("jssha").default;

class TfaService {
    static hex2dec = function(s) {
        return parseInt(s, 16);
    };

    static dec2hex = function(s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    };

    static base32tohex = function(base32) {
        let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let bits = "";
        let hex = "";

        for(let i = 0; i < base32.length; i++) {
            let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += String(val.toString(2)).padStart(5, "0");
        }

        for(let i = 0; i + 4 <= bits.length; i += 4) {
            let chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }
        return hex;
    };

    static getTOTP = function(key, timeoffset) {
        let epoch; let time; let shaObj; let hmac; let offset; let otp;
        let hashkey = this.base32tohex(key);
        epoch = Math.round((Date.now() + timeoffset) / 1000.0);
        time = String(this.dec2hex(Math.floor(epoch / 30))).padStart(16, "0");
        shaObj = new JsSha("SHA-1", "HEX");
        shaObj.setHMACKey(hashkey, "HEX");
        shaObj.update(time);
        hmac = shaObj.getHMAC("HEX");
        offset = this.hex2dec(hmac.substring(hmac.length - 1));
        otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) + "";
        otp = otp.substr(otp.length - 6, 6);
        return otp;
    };
}

module.exports = TfaService;
