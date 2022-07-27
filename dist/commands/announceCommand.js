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
exports.AnnounceCommand = void 0;
const discord_js_1 = require("discord.js");
const discordConfig_1 = require("../util/discordConfig");
class AnnounceCommand {
    constructor(client) {
        this._client = client;
        this.name = "announce";
        this.description = "Create an announcement in the current channel.";
        this.options = [
            {
                name: "title",
                description: "Title",
                required: true,
                type: discord_js_1.ApplicationCommandOptionType.String,
            },
            {
                name: "text",
                description: "Text",
                required: true,
                type: discord_js_1.ApplicationCommandOptionType.String,
            }
        ];
    }
    run(interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand() || !interaction.isRepliable())
                return;
            const args = interaction.options;
            if (args == undefined)
                return;
            const channel = interaction.channel;
            if (channel == null)
                return;
            const member = (_a = this._client) === null || _a === void 0 ? void 0 : _a.getMember(interaction.user.id);
            if (member == undefined)
                return;
            const title = args.getString('title');
            if (title == null)
                return;
            const text = args.getString('text');
            if (text == null)
                return;
            if (!((_b = this._client) === null || _b === void 0 ? void 0 : _b.hasRole(member, [discordConfig_1.DiscordRoles.Administrator]))) {
                return yield interaction.reply({
                    content: discordConfig_1.DiscordText.NoPermission,
                    ephemeral: true,
                });
            }
            const maxLenght = 1500;
            if (text.length > maxLenght || text.length > maxLenght) {
                return interaction.reply({
                    ephemeral: true,
                    content: `The title and text must not be longer than ${maxLenght} characters.`
                });
            }
            yield channel.send({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(title)
                        .setDescription(text)
                        .setTimestamp()
                        .setFooter({ text: 'Some footer text here' })
                ],
            });
            yield interaction.reply({
                content: "Announcement created successfully.",
                ephemeral: true,
            });
        });
    }
}
exports.AnnounceCommand = AnnounceCommand;
