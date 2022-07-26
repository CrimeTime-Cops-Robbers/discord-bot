// imports from discord.js
import { Client, Guild, GatewayIntentBits, Channel, GuildMember, User, } from 'discord.js'
// imports from discordLogger.ts
import { DiscordLogger } from './util/discordLogger';
// imports from discordConfig.ts
import { DiscordConfig, DiscordGuild } from './util/discordConfig';
// imports from eventController.ts
import { EventController } from './controllers/eventController';
// imports from onMessageEvent.ts
import { OnMessageEvent } from './events/onMessageEvent';
// imports from commandController.ts
import { CommandController } from './controllers/commandController';
// imports from clearCommand.ts
import { ClearCommand } from './commands/clearCommand';
//intents for discord bot
const discordIntents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
];
// extension of "Client"
export class DiscordClient extends Client {
    private _guild: Guild | undefined;
    private _logger: DiscordLogger = new DiscordLogger();
    private _config: DiscordConfig = new DiscordConfig();
    private _eventController: EventController | undefined;
    private _commandController: CommandController | undefined;

    constructor() {
        super({
            intents: discordIntents,
        });
        this.initialize();
    }
    public get logger(): DiscordLogger {
        return this._logger;
    }
    public get guild(): Guild | undefined {
        return this._guild;
    }
    public get config(): DiscordConfig {
        return this._config;
    }
    private async ready(): Promise<void> {

        this._eventController = new EventController(this, [
            //register discord events...
            new OnMessageEvent(this),
        ]);
        await this._eventController.initialize();

        this._commandController = new CommandController(this, [
            //register discord commands...
            new ClearCommand(this),
        ]);
        await this._commandController.initialize();
    }
    private async fetchData(): Promise<void> {
        this._guild = await this.guilds.fetch(DiscordGuild.GuildId); // <= fetch guild
        await this.guild?.members.fetch(); // <= fetch members
        await this.guild?.roles.fetch(); // <= fetch roles
        await this.guild?.channels.fetch(); // fetch channels
    }
    private async initialize(): Promise<void> {
        this.logger.info('Bot has been startet.');
        await this.login(this.config.token); // <= login bot
        await this.ready(); // <= ready event
        await this.fetchData(); // <= fetch data
        this.logger.info('Bot is loaded successfully.');
    }
    public getChannel(id: string): Channel | undefined {
        if (this.guild == undefined) return undefined;
        return this.channels.cache.find(x => x.id == id);;
    }
    public getMember(id: string): GuildMember | undefined {
        if (this.guild == undefined) return undefined;
        return this.guild.members.cache.find(x => x.id == id);
    }
    public getUser(id: string): User | undefined {
        return this.users.cache.find(x => x.id == id);
    }
    public hasRole(member: GuildMember, roleId: string): boolean {
        return member.roles.cache.some(x => x.id == roleId);
    }
    public wait<T>(ms: number): Promise<T> {
        return new Promise(r => setTimeout(r, ms));
    }
}
const discordClient: DiscordClient = new DiscordClient();