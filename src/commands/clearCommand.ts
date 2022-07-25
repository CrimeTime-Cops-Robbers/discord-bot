import { CacheType, Collection, Message, CommandInteractionOptionResolver, TextBasedChannelFields, GuildMember, User, Interaction, ApplicationCommandOptionType } from 'discord.js';
import { DiscordClient } from '../index'
import { DiscordCommand } from '../interfaces/discordCommand';
import { DiscordCommandArgument } from '../interfaces/discordCommandArgument';

export class ClearCommand implements DiscordCommand {
    public name: string | undefined;
    public description: string | undefined;
    public options: DiscordCommandArgument[] | undefined;
    private _client: DiscordClient | undefined;

    constructor(client: DiscordClient) {
        this._client = client;
        this.name = "clear";
        this.description = "Delete multiple messages";
        this.options = [
            {
                name: "amount",
                description: "Amount",
                required: true,
                type: ApplicationCommandOptionType.Number,
            }
        ];
    }
    public async run(interaction: Interaction<CacheType>): Promise<any> {
        if (!interaction.isChatInputCommand()) return;
        const args: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused"> = interaction.options;
        const channel: TextBasedChannelFields = interaction.channel as TextBasedChannelFields;
        const user: User = interaction.user;
        const member: GuildMember = interaction.member as GuildMember;
        const amount: number = args.getNumber('amount') as number;

        if (!interaction.isRepliable()) return;

        if (amount > 100) {
            return await interaction.reply({
                content: `You cannot delete more than 100 messages at the same time.`,
                ephemeral: true,
            });
        }

        const messages: Collection<string, Message<boolean>> | undefined = await channel.messages.fetch
            (
                {
                    limit: amount,
                }
            );

        if (messages == undefined) {
            return await interaction.reply({
                content: `There are no messages to delete here.`,
                ephemeral: true,
            });
        }

        await channel.bulkDelete(messages).catch(error => {
            if (error.code != 10008) {
                this._client?.logger?.error(`Failed to delete the message: ${error.code}`)
            }
        });

        await interaction.reply({
            content: `Found ${messages.size} message(s)`,
            ephemeral: true,
        });
    }
}