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
exports.CommandController = void 0;
// imports from discordConfig.ts
const discordConfig_1 = require("../util/discordConfig");
class CommandController {
    constructor(client, commands) {
        this._client = client;
        this._commands = commands;
    }
    initialize() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._client == undefined || this._commands == undefined)
                return;
            var discordCommands = (_a = this._client.application) === null || _a === void 0 ? void 0 : _a.commands;
            if (discordCommands == undefined)
                return;
            (_b = this._commands) === null || _b === void 0 ? void 0 : _b.forEach((x) => __awaiter(this, void 0, void 0, function* () {
                yield (discordCommands === null || discordCommands === void 0 ? void 0 : discordCommands.create({
                    name: x.name,
                    description: x.description,
                    options: x.options,
                }));
            }));
            this._client.on(discordConfig_1.DiscordEvents.interactionCreate, (interaction) => __awaiter(this, void 0, void 0, function* () {
                var _c;
                if (!interaction.isChatInputCommand())
                    return;
                const command = this.getCommand(interaction.commandName);
                if (command == undefined) {
                    (_c = this._client) === null || _c === void 0 ? void 0 : _c.logger.error('Error at \"getCommand\" code(102)');
                }
                if (command != undefined) {
                    command.run(interaction);
                }
            }));
        });
    }
    getCommand(name) {
        var _a;
        return (_a = this._commands) === null || _a === void 0 ? void 0 : _a.find(x => { var _a; return ((_a = x.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == name.toLowerCase(); });
    }
}
exports.CommandController = CommandController;
