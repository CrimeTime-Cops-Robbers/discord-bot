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
// imports from discord.js
const discord_js_1 = require("discord.js");
// imports from discordLogger.ts
const discordLogger_1 = require("./util/discordLogger");
// imports from discordConfig.ts
const discordConfig_1 = require("./util/discordConfig");
// imports from eventController.ts
const eventController_1 = require("./controllers/eventController");
// imports from onMessageEvent.ts
const onMessageEvent_1 = require("./events/onMessageEvent");
// extension of "Client"
class DiscordClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
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
            ]
        });
        this._logger = new discordLogger_1.DiscordLogger();
        this._config = new discordConfig_1.DiscordConfig();
        this.initialize();
    }
    //get
    get logger() {
        return this._logger;
    }
    get guild() {
        return this._guild;
    }
    get config() {
        return this._config;
    }
    //methods
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            this._eventController = new eventController_1.EventController(this, [
                //register discord events...
                new onMessageEvent_1.OnMessageEvent(this),
            ]);
            yield this._eventController.initialize();
        });
    }
    fetchData() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.guild) === null || _a === void 0 ? void 0 : _a.members.fetch()); // <= fetch members
            yield ((_b = this.guild) === null || _b === void 0 ? void 0 : _b.roles.fetch()); // <= fetch roles
            yield ((_c = this.guild) === null || _c === void 0 ? void 0 : _c.channels.fetch()); // fetch channels
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
}
exports.DiscordClient = DiscordClient;
new DiscordClient();
