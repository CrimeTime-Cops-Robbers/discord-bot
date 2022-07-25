"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnMessageEvent = void 0;
// imports from discordConfig.ts
const discordConfig_1 = require("../util/discordConfig");
//blacklisted strings
const allowedLinks = ['youtube', 'tenor'];
const linkKeywords = ['.com', '.ru', '.net', '.org', '.info', '.biz', '.io', '.co', 'https://', 'http://'];
class OnMessageEvent {
    constructor(client) {
        this.name = discordConfig_1.DiscordEvents.messageCreate;
        this._client = client;
    }
    register() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this._client) === null || _a === void 0 ? void 0 : _a.on(this.name, (...args) => __awaiter(this, void 0, void 0, function* () { return yield this.run(args); })));
        });
    }
    checkLink(content) {
        const isLink = linkKeywords.some(x => content.toLowerCase().includes(x));
        const isBlacklisted = !allowedLinks.some(x => content.toLowerCase().includes(x));
        return isLink && isBlacklisted;
    }
    run(args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (args == undefined)
                return;
            const message = args[0];
            if (message == undefined)
                return;
            if (this.checkLink(message.content)) {
                (_a = this._client) === null || _a === void 0 ? void 0 : _a.logger.info(`Found blacklisted link!`);
            }
        });
    }
}
exports.OnMessageEvent = OnMessageEvent;
