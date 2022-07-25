export enum DiscordRoles {
    Managment = "997483551329091684",
    Administrator = "997482648115097610",
    Moderator = "997482068885901384",
    Supporter = "997480771793195048",
    Staff = "997477351921307688",
    Partner = "997483102416928828",
    Sponsor = "997482986914185436",
    VIP = "997483047731593348",
    Verified = "997478512405532723",
};

export enum DiscordChannels {
    Ticket = '997804752958140457',
};

export enum DiscordCategory {
    Ticket = '997804720808800366',
};

export class DiscordConfig {
    public token: string | undefined;
    public guildId: string | undefined;
    constructor() {
        this.token = "HERE_MY_TOKEN";
        this.guildId = "996703131461242982";
    }
};