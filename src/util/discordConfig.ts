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

export enum DiscordEvents {
    applicationCommandCreate = "applicationCommandCreate",
    applicationCommandDelete = "applicationCommandDelete",
    applicationCommandUpdate = "applicationCommandUpdate",
    cacheSweep = "cacheSweep",
    channelCreate = "channelCreate",
    channelDelete = "channelDelete",
    channelPinsUpdate = "channelPinsUpdate",
    channelUpdate = "channelUpdate",
    oldChannel = "oldChannel",
    newChannel = "newChannel",
    warn = "warn",
    emojiCreate = "emojiCreate",
    emojiDelete = "emojiDelete",
    emojiUpdate = "emojiUpdate",
    error = "error",
    guildBanAdd = "guildBanAdd",
    guildBanRemove = "guildBanRemove",
    guildCreate = "guildCreate",
    guildDelete = "guildDelete",
    guildUnavailable = "guildUnavailable",
    guildIntegrationsUpdate = "guildIntegrationsUpdate",
    guildMemberAdd = "guildMemberAdd",
    guildMemberAvailable = "guildMemberAvailable",
    guildMemberRemove = "guildMemberRemove",
    guildMembersChunk = "guildMembersChunk",
    guildMemberUpdate = "guildMemberUpdate",
    guildUpdate = "guildUpdate",
    inviteCreate = "inviteCreate",
    inviteDelete = "inviteDelete",
    message = "message",
    messageCreate = "messageCreate",
    messageDelete = "messageDelete",
    messageReactionRemoveAll = "messageReactionRemoveAll",
    messageReactionRemoveEmoji = "messageReactionRemoveEmoji",
    messageDeleteBulk = "messageDeleteBulk",
    messageReactionAdd = "messageReactionAdd",
    messageReactionRemove = "messageReactionRemove",
    messageUpdate = "messageUpdate",
    presenceUpdate = "presenceUpdate",
    ready = "ready",
    invalidated = "invalidated",
    roleCreate = "roleCreate",
    roleDelete = "roleDelete",
    roleUpdate = "roleUpdate",
    threadCreate = "threadCreate",
    threadDelete = "threadDelete",
    threadListSync = "threadListSync",
    threadMemberUpdate = "threadMemberUpdate",
    threadMembersUpdate = "threadMembersUpdate",
    threadUpdate = "threadUpdate",
    typingStart = "typingStart",
    userUpdate = "userUpdate",
    webhookUpdate = "webhookUpdate",
    interaction = "interaction",
    interactionCreate = "interactionCreate",
    shardDisconnect = "shardDisconnect",
    shardError = "shardError",
    shardReady = "shardReady",
    shardReconnecting = "shardReconnecting",
    shardResume = "shardResume",
    stageInstanceCreate = "stageInstanceCreate",
    stageInstanceUpdate = "stageInstanceUpdate",
    stageInstanceDelete = "stageInstanceDelete",
    stickerCreate = "stickerCreate",
    stickerDelete = "stickerDelete",
    stickerUpdate = "stickerUpdate",
    guildScheduledEventCreate = "guildScheduledEventCreate",
    guildScheduledEventUpdate = "guildScheduledEventUpdate",
    guildScheduledEventDelete = "guildScheduledEventDelete",
    guildScheduledEventUserAdd = "guildScheduledEventUserAdd",
    guildScheduledEventUserRemove = "guildScheduledEventUserRemove",
};

export class DiscordConfig {
    public token: string | undefined;
    public guildId: string | undefined;
    constructor() {
        this.token = "OTk3MTk4NDYxOTc4MDM0MjE3.GTJopc.9o5fGFBhbSOeVBzRin36_DxjxtIBMXOwukHJFc";
        this.guildId = "996703131461242982";
    }
};