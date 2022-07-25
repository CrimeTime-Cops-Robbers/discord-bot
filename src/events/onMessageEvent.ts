// imports from discord.js
import { Message } from 'discord.js'
// imports from index.ts
import { DiscordClient } from '../index'
// imports from discordEvent.ts
import { DiscordEvent } from '../interfaces/discordEvent'
// imports from discordConfig.ts
import { DiscordEvents } from '../util/discordConfig';

export class OnMessageEvent implements DiscordEvent {
    private _client: DiscordClient | undefined;
    public name: string = DiscordEvents.messageCreate;

    constructor(client: DiscordClient) {
        this._client = client;
    }
    public async register(): Promise<any> {
        await this._client?.on(this.name, async (...args: string[]) => await this.run(args));
    }
    public async run(args?: any[] | undefined): Promise<any> {
        if (args == undefined) return;
        const message: Message = args[0];
    }
}