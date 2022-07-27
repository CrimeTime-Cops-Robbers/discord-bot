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
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run(); // <= run direct from register because discord once ready is kinda broke...
            // await this._client?.once(this.name, async (...args: string[]) => await this.run());
        });
    }
    run() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            (_b = (_a = this._client) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.setPresence({
                activities: [{
                        name: "Hello i am CrimeTime Bot",
                    }]
            });
        });
    }
}
exports.OnReadyEvent = OnReadyEvent;
