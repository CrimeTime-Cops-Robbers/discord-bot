import { Client, Guild, GatewayIntentBits, Channel, GuildMember, User, Snowflake, Role, Collection, NonThreadGuildBasedChannel, } from 'discord.js'
import { DiscordLogger } from './util/discordLogger';
import { DiscordConfig, DiscordGuild } from './util/discordConfig';
import { EventController } from './controllers/eventController';
import { OnMessageEvent } from './events/onMessageEvent';
import { CommandController } from './controllers/commandController';
import { ClearCommand } from './commands/clearCommand';
import { OnReadyEvent } from './events/onReadyEvent';
import { AnnounceCommand } from './commands/announceCommand';
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
    private _avatar: string | undefined | null;

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
    public get avatar(): string | undefined | null {
        return this._avatar;
    }
    private async ready(): Promise<void> {

        this._eventController = new EventController(this, [
            //register discord events...
            new OnMessageEvent(this),
            new OnReadyEvent(this),
        ]);
        await this._eventController.initialize();

        this._commandController = new CommandController(this, [
            //register discord commands...
            new ClearCommand(this),
            new AnnounceCommand(this),
        ]);
        await this._commandController.initialize();
    }
    private async fetchData(): Promise<void> {

        this._guild = await this.guilds.fetch(DiscordGuild.GuildId); // <= fetch guild

        if (typeof this._guild == 'undefined') {
            return this.logger.error('Failed to fetch guild. code (018)');
        }

        const members: Collection<Snowflake, GuildMember> | undefined = await this.guild?.members.fetch(); // <= fetch members

        if (typeof members == 'undefined') {
            return this.logger.error('Failed to fetch members. code (019)');
        }

        const roles: Collection<Snowflake, Role> | undefined = await this.guild?.roles.fetch(); // <= fetch roles

        if (typeof roles == 'undefined') {
            return this.logger.error('Failed to fetch roles. code (020)');
        }

        const channels: Collection<Snowflake, NonThreadGuildBasedChannel> | undefined = await this.guild?.channels.fetch(); // fetch channels

        if (typeof channels == 'undefined') {
            return this.logger.error('Failed to fetch channels. code (021)');
        }

        this._avatar = this.user?.avatarURL(); // <= fetch avatar

        if (typeof this._avatar != 'string') {
            return this.logger.error('Failed to fetch avatarUrl. code (022)');
        }
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
    public hasRole(member: GuildMember, roleIds: string[]): boolean {
        return member.roles.cache.some(x => roleIds.includes(x.id));
    }
    public wait<T>(ms: number): Promise<T> {
        return new Promise(r => setTimeout(r, ms));
    }
}
const discordClient: DiscordClient = new DiscordClient();