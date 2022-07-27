import { Message } from 'discord.js'
import { DiscordClient } from '../index'
import { DiscordEvent } from '../interfaces/discordEvent'
import { DiscordEvents } from '../util/discordConfig';

//blacklisted strings
const allowedLinks: string[] = ['youtube', 'tenor'];
const linkKeywords: string[] = ['.com', '.ru', '.net', '.org', '.info', '.biz', '.io', '.co', 'https://', 'http://'];

export class OnMessageEvent implements DiscordEvent {
    private _client: DiscordClient | undefined;
    public name: string = DiscordEvents.messageCreate;

    constructor(client: DiscordClient) {
        this._client = client;
    }
    public async register(): Promise<any> {
        await this._client?.on(this.name, async (...args: string[]) => await this.run(args));
    }
    private checkLink(content: string): boolean {
        const isLink: boolean = linkKeywords.some(x => content.toLowerCase().includes(x));
        const isBlacklisted: boolean = !allowedLinks.some(x => content.toLowerCase().includes(x));
        return isLink && isBlacklisted;
    }
    public async run(args?: any[] | undefined): Promise<any> {
        if (args == undefined) return;
        const message: Message = args[0];
        if (message == undefined) return;

        if (this.checkLink(message.content)) {
            this._client?.logger.info(`Found blacklisted link!`);
        }
    }
}