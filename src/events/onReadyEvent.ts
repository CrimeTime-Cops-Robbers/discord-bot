// imports from index.ts
import { ActivityType } from 'discord.js';
import { DiscordClient } from '../index'
// imports from discordEvent.ts
import { DiscordEvent } from '../interfaces/discordEvent'
// imports from discordConfig.ts
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

        console.log("ready");

        this._client?.user?.setPresence({
            activities: [{
                name: "Hello i am CrimeTime Bot",
            }]
        })
    }
}