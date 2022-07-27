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
exports.OnReadyEvent = void 0;
const discordConfig_1 = require("../util/discordConfig");
class OnReadyEvent {
    constructor(client) {
        this.name = discordConfig_1.DiscordEvents.ready;
        this._client = client;
    }
    register() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this._client) === null || _a === void 0 ? void 0 : _a.once(this.name, (...args) => __awaiter(this, void 0, void 0, function* () { return yield this.run(); })));
        });
    }
    run() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this._client) === null || _a === void 0 ? void 0 : _a.logger.debug('Bot calls discord-ready-event...');
            (_c = (_b = this._client) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.setPresence({
                activities: [{
                        name: "Hello i am CrimeTime Bot",
                    }]
            });
        });
    }
}
exports.OnReadyEvent = OnReadyEvent;
