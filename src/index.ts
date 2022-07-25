// imports from discord.js
import { Client, Guild, GatewayIntentBits, } from 'discord.js'
// imports from discordLogger.ts
import { DiscordLogger } from './util/discordLogger';
// imports from discordConfig.ts
import { DiscordConfig } from './util/discordConfig';
// imports from eventController.ts
import { EventController } from './controllers/eventController';

// extension of "Client"
export class DiscordClient extends Client {
    private _guild: Guild | undefined;
    private _logger: DiscordLogger = new DiscordLogger();
    private _config: DiscordConfig = new DiscordConfig();
    private _eventController: EventController | undefined;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages
            ]
        });
        this.initialize();
    }

    //get
    public get logger(): DiscordLogger {
        return this._logger;
    }
    public get guild(): Guild | undefined {
        return this._guild;
    }
    public get config(): DiscordConfig {
        return this._config;
    }
    //methods
    private async ready(): Promise<void> {

        this._eventController = new EventController(this, [
            //register discord events...
        ]);
        await this._eventController.initialize();
    }
    private async fetchData(): Promise<void> {
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
}