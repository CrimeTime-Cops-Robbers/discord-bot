import { CacheType, Collection, Message, CommandInteractionOptionResolver, TextBasedChannelFields, Interaction, ApplicationCommandOptionType, InteractionResponse, GuildMember, Embed, EmbedBuilder } from 'discord.js';
import { DiscordClient } from '../index'
import { DiscordCommand } from '../interfaces/discordCommand';
import { DiscordCommandArgument } from '../interfaces/discordCommandArgument';
import { DiscordRoles, DiscordText } from '../util/discordConfig';

export class AnnounceCommand implements DiscordCommand {
    public name: string | undefined;
    public description: string | undefined;
    public options: DiscordCommandArgument[] | undefined;
    private _client: DiscordClient | undefined;

    constructor(client: DiscordClient) {
        this._client = client;
        this.name = "announce";
        this.description = "Create an announcement in the current channel.";
        this.options = [
            {
                name: "title",
                description: "Title",
                required: true,
                type: ApplicationCommandOptionType.String,
            },
            {
                name: "text",
                description: "Text",
                required: true,
                type: ApplicationCommandOptionType.String,
            }
        ];
    }
    public async run(interaction: Interaction<CacheType>): Promise<void | InteractionResponse<boolean>> {
        if (!interaction.isChatInputCommand() || !interaction.isRepliable()) return;

        const args: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused"> = interaction.options;
        if (args == undefined) return;

        const channel: TextBasedChannelFields = interaction.channel as TextBasedChannelFields;
        if (channel == null) return;

        const member: GuildMember | undefined = this._client?.getMember(interaction.user.id);
        if (member == undefined) return;

        const title: string | null = args.getString('title');
        if (title == null) return;

        const text: string | null = args.getString('text');
        if (text == null) return;

        if (!this._client?.hasRole(member, [DiscordRoles.Administrator])) {
            return await interaction.reply({
                content: DiscordText.NoPermission,
                ephemeral: true,
            });
        }

        const maxLenght = 1500;

        if (text.length > maxLenght || text.length > maxLenght) {
            return interaction.reply({
                ephemeral: true,
                content: `The title and text must not be longer than ${maxLenght} characters.`
            });
        }

        await channel.send(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(title)
                        .setDescription(text)
                        .setTimestamp()
                        .setFooter(
                            { text: 'Some footer text here' }
                        )
                ],
            }
        );

        await interaction.reply(
            {
                content: "Announcement created successfully.",
                ephemeral: true,
            }
        );
    }
}