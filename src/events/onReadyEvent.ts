import { DiscordClient } from '../index'
import { DiscordEvent } from '../interfaces/discordEvent'
import { DiscordEvents } from '../util/discordConfig';

export class OnReadyEvent implements DiscordEvent {
    private _client: DiscordClient | undefined;
    public name: string = DiscordEvents.ready;

    constructor(client: DiscordClient) {
        this._client = client;
    }
    public async register(): Promise<any> {
        await this._client?.once(this.name, async (...args: string[]) => await this.run());
    }
    public async run(): Promise<any> {

        this._client?.logger.debug('Bot calls discord-ready-event...');

        this._client?.user?.setPresence({
            activities: [{
                name: "Hello i am CrimeTime Bot",
            }]
        })
    }
}