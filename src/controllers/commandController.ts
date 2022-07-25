// imports from discord.ts
import { CacheType, Interaction } from "discord.js";
// imports from index.ts
import { DiscordClient } from "../index";
// imports from discordCommand.ts
import { DiscordCommand } from "../interfaces/discordCommand";
// imports from discordConfig.ts
import { DiscordEvents } from "../util/discordConfig";

export class CommandController {
    private _client: DiscordClient | undefined;
    private _commands: DiscordCommand[] | undefined;

    constructor(client: DiscordClient, commands: DiscordCommand[]) {
        this._client = client;
        this._commands = commands;
    }
    public async initialize(): Promise<void> {
        if (this._client == undefined || this._commands == undefined) return;

        var discordCommands = this._client.application?.commands;
        if (discordCommands == undefined) return;

        this._commands?.forEach(async (x) => {
            await discordCommands?.create({
                name: x.name!,
                description: x.description!,
                options: x.options!,
            });
        });

        this._client.on(DiscordEvents.interactionCreate, async (interaction: Interaction<CacheType>) => {
            if (!interaction.isChatInputCommand()) return;

            const command: DiscordCommand | undefined = this.getCommand(interaction.commandName);
            if (command == undefined) {
                this._client?.logger.error('Error at \"getCommand\" code(102)');
            }

            if (command != undefined) {
                command.run(interaction);
            }
        });
    }
    public getCommand(name: string): DiscordCommand | undefined {
        return this._commands?.find(x => x.name?.toLowerCase() == name.toLowerCase());
    }
}