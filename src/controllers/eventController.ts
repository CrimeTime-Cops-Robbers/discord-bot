import { DiscordClient } from '../index';
import { DiscordEvent } from '../interfaces/discordEvent';

export class EventController {
    private _client: DiscordClient | undefined;
    private _events: DiscordEvent[] | undefined;

    constructor(client: DiscordClient, events: DiscordEvent[]) {
        this._client = client;
        this._events = events;
        this._client.logger.done(`Loaded ${this._events.length} Event(s)...`);
    }
    public async initialize(): Promise<void> {
        if (this._client == undefined || this._events == undefined) return;

        this._events.forEach(async (event) => {
            await event.register();
            this._client?.logger.done(`Event \"${event.name}\" registered.`);
        });
    }
}