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
exports.DiscordClient = void 0;
const discord_js_1 = require("discord.js");
const discordLogger_1 = require("./util/discordLogger");
const discordConfig_1 = require("./util/discordConfig");
const eventController_1 = require("./controllers/eventController");
const onMessageEvent_1 = require("./events/onMessageEvent");
const commandController_1 = require("./controllers/commandController");
const clearCommand_1 = require("./commands/clearCommand");
const onReadyEvent_1 = require("./events/onReadyEvent");
const announceCommand_1 = require("./commands/announceCommand");
//intents for discord bot
const discordIntents = [
    discord_js_1.GatewayIntentBits.Guilds,
    discord_js_1.GatewayIntentBits.GuildMembers,
    discord_js_1.GatewayIntentBits.GuildBans,
    discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
    discord_js_1.GatewayIntentBits.GuildIntegrations,
    discord_js_1.GatewayIntentBits.GuildWebhooks,
    discord_js_1.GatewayIntentBits.GuildInvites,
    discord_js_1.GatewayIntentBits.GuildVoiceStates,
    discord_js_1.GatewayIntentBits.GuildPresences,
    discord_js_1.GatewayIntentBits.GuildMessages,
    discord_js_1.GatewayIntentBits.GuildMessageReactions,
    discord_js_1.GatewayIntentBits.GuildMessageTyping,
    discord_js_1.GatewayIntentBits.DirectMessages,
    discord_js_1.GatewayIntentBits.DirectMessageReactions,
    discord_js_1.GatewayIntentBits.DirectMessageTyping,
    discord_js_1.GatewayIntentBits.MessageContent,
    discord_js_1.GatewayIntentBits.GuildScheduledEvents,
];
// extension of "Client"
class DiscordClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: discordIntents,
        });
        this._logger = new discordLogger_1.DiscordLogger();
        this._config = new discordConfig_1.DiscordConfig();
        this.initialize();
    }
    get logger() {
        return this._logger;
    }
    get guild() {
        return this._guild;
    }
    get config() {
        return this._config;
    }
    get avatar() {
        return this._avatar;
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            this._eventController = new eventController_1.EventController(this, [
                //register discord events...
                new onMessageEvent_1.OnMessageEvent(this),
                new onReadyEvent_1.OnReadyEvent(this),
            ]);
            yield this._eventController.initialize();
            this._commandController = new commandController_1.CommandController(this, [
                //register discord commands...
                new clearCommand_1.ClearCommand(this),
                new announceCommand_1.AnnounceCommand(this),
            ]);
            yield this._commandController.initialize();
        });
    }
    fetchData() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this._guild = yield this.guilds.fetch(discordConfig_1.DiscordGuild.GuildId); // <= fetch guild
            if (typeof this._guild == 'undefined') {
                return this.logger.error('Failed to fetch guild. code (018)');
            }
            const members = yield ((_a = this.guild) === null || _a === void 0 ? void 0 : _a.members.fetch()); // <= fetch members
            if (typeof members == 'undefined') {
                return this.logger.error('Failed to fetch members. code (019)');
            }
            const roles = yield ((_b = this.guild) === null || _b === void 0 ? void 0 : _b.roles.fetch()); // <= fetch roles
            if (typeof roles == 'undefined') {
                return this.logger.error('Failed to fetch roles. code (020)');
            }
            const channels = yield ((_c = this.guild) === null || _c === void 0 ? void 0 : _c.channels.fetch()); // fetch channels
            if (typeof channels == 'undefined') {
                return this.logger.error('Failed to fetch channels. code (021)');
            }
            this._avatar = (_d = this.user) === null || _d === void 0 ? void 0 : _d.avatarURL(); // <= fetch avatar
            if (typeof this._avatar != 'string') {
                return this.logger.error('Failed to fetch avatarUrl. code (022)');
            }
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('Bot has been startet.');
            yield this.login(this.config.token); // <= login bot
            yield this.ready(); // <= ready event
            yield this.fetchData(); // <= fetch data
            this.logger.info('Bot is loaded successfully.');
        });
    }
    getChannel(id) {
        if (this.guild == undefined)
            return undefined;
        return this.channels.cache.find(x => x.id == id);
        ;
    }
    getMember(id) {
        if (this.guild == undefined)
            return undefined;
        return this.guild.members.cache.find(x => x.id == id);
    }
    getUser(id) {
        return this.users.cache.find(x => x.id == id);
    }
    hasRole(member, roleIds) {
        return member.roles.cache.some(x => roleIds.includes(x.id));
    }
    wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}
exports.DiscordClient = DiscordClient;
const discordClient = new DiscordClient();
