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
exports.ClearCommand = void 0;
// imports from discord.ts
const discord_js_1 = require("discord.js");
class ClearCommand {
    constructor(client) {
        this._client = client;
        this.name = "clear";
        this.description = "Delete multiple messages";
        this.options = [
            {
                name: "amount",
                description: "Amount",
                required: true,
                type: discord_js_1.ApplicationCommandOptionType.Number,
            }
        ];
    }
    run(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand() || !interaction.isRepliable())
                return;
            const args = interaction.options;
            if (args == undefined)
                return;
            const channel = interaction.channel;
            if (channel == null)
                return;
            const amount = args.getNumber('amount');
            if (amount == null)
                return;
            if (amount > 100) {
                return yield interaction.reply({
                    content: `You cannot delete more than 100 messages at the same time.`,
                    ephemeral: true,
                });
            }
            const messages = yield channel.messages.fetch({
                limit: amount,
            });
            if (messages == undefined) {
                return yield interaction.reply({
                    content: `There are no messages to delete here.`,
                    ephemeral: true,
                });
            }
            yield channel.bulkDelete(messages).catch(error => {
                var _a, _b;
                if (error.code != 10008) {
                    (_b = (_a = this._client) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.error(`Failed to delete the message: ${error.code}`);
                }
            });
            yield interaction.reply({
                content: `Found ${messages.size} message(s)`,
                ephemeral: true,
            });
        });
    }
}
exports.ClearCommand = ClearCommand;
