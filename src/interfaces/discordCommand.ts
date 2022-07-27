import { CacheType, Interaction } from 'discord.js';
import { DiscordCommandArgument } from './discordCommandArgument'
export interface DiscordCommand {
    name: string | undefined;
    description: string | undefined;
    options: DiscordCommandArgument[] | undefined;
    run(interaction: Interaction<CacheType>): void;
}