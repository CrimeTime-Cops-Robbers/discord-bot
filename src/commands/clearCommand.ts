import { CacheType, Collection, Message, CommandInteractionOptionResolver, TextBasedChannelFields, Interaction, ApplicationCommandOptionType, InteractionResponse, GuildMember } from 'discord.js';
import { DiscordClient } from '../index'
import { DiscordCommand } from '../interfaces/discordCommand';
import { DiscordCommandArgument } from '../interfaces/discordCommandArgument';
import { DiscordRoles, DiscordText } from '../util/discordConfig';

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
    public async run(interaction: Interaction<CacheType>): Promise<void | InteractionResponse<boolean>> {
        if (!interaction.isChatInputCommand() || !interaction.isRepliable()) return;

        const args: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused"> = interaction.options;
        if (args == undefined) return;

        const channel: TextBasedChannelFields = interaction.channel as TextBasedChannelFields;
        if (channel == null) return;

        const amount: number | null = args.getNumber('amount');
        if (amount == null) return;

        const member: GuildMember | undefined = this._client?.getMember(interaction.user.id);
        if (member == undefined) return;

        if (!this._client?.hasRole(member, [DiscordRoles.Administrator])) {
            return await interaction.reply({
                content: DiscordText.NoPermission,
                ephemeral: true,
            });
        }

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