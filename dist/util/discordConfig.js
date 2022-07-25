"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordConfig = exports.DiscordEvents = exports.DiscordCategory = exports.DiscordChannels = exports.DiscordRoles = void 0;
var DiscordRoles;
(function (DiscordRoles) {
    DiscordRoles["Managment"] = "997483551329091684";
    DiscordRoles["Administrator"] = "997482648115097610";
    DiscordRoles["Moderator"] = "997482068885901384";
    DiscordRoles["Supporter"] = "997480771793195048";
    DiscordRoles["Staff"] = "997477351921307688";
    DiscordRoles["Partner"] = "997483102416928828";
    DiscordRoles["Sponsor"] = "997482986914185436";
    DiscordRoles["VIP"] = "997483047731593348";
    DiscordRoles["Verified"] = "997478512405532723";
})(DiscordRoles = exports.DiscordRoles || (exports.DiscordRoles = {}));
;
var DiscordChannels;
(function (DiscordChannels) {
    DiscordChannels["Ticket"] = "997804752958140457";
})(DiscordChannels = exports.DiscordChannels || (exports.DiscordChannels = {}));
;
var DiscordCategory;
(function (DiscordCategory) {
    DiscordCategory["Ticket"] = "997804720808800366";
})(DiscordCategory = exports.DiscordCategory || (exports.DiscordCategory = {}));
;
var DiscordEvents;
(function (DiscordEvents) {
    DiscordEvents["applicationCommandCreate"] = "applicationCommandCreate";
    DiscordEvents["applicationCommandDelete"] = "applicationCommandDelete";
    DiscordEvents["applicationCommandUpdate"] = "applicationCommandUpdate";
    DiscordEvents["cacheSweep"] = "cacheSweep";
    DiscordEvents["channelCreate"] = "channelCreate";
    DiscordEvents["channelDelete"] = "channelDelete";
    DiscordEvents["channelPinsUpdate"] = "channelPinsUpdate";
    DiscordEvents["channelUpdate"] = "channelUpdate";
    DiscordEvents["oldChannel"] = "oldChannel";
    DiscordEvents["newChannel"] = "newChannel";
    DiscordEvents["warn"] = "warn";
    DiscordEvents["emojiCreate"] = "emojiCreate";
    DiscordEvents["emojiDelete"] = "emojiDelete";
    DiscordEvents["emojiUpdate"] = "emojiUpdate";
    DiscordEvents["error"] = "error";
    DiscordEvents["guildBanAdd"] = "guildBanAdd";
    DiscordEvents["guildBanRemove"] = "guildBanRemove";
    DiscordEvents["guildCreate"] = "guildCreate";
    DiscordEvents["guildDelete"] = "guildDelete";
    DiscordEvents["guildUnavailable"] = "guildUnavailable";
    DiscordEvents["guildIntegrationsUpdate"] = "guildIntegrationsUpdate";
    DiscordEvents["guildMemberAdd"] = "guildMemberAdd";
    DiscordEvents["guildMemberAvailable"] = "guildMemberAvailable";
    DiscordEvents["guildMemberRemove"] = "guildMemberRemove";
    DiscordEvents["guildMembersChunk"] = "guildMembersChunk";
    DiscordEvents["guildMemberUpdate"] = "guildMemberUpdate";
    DiscordEvents["guildUpdate"] = "guildUpdate";
    DiscordEvents["inviteCreate"] = "inviteCreate";
    DiscordEvents["inviteDelete"] = "inviteDelete";
    DiscordEvents["message"] = "message";
    DiscordEvents["messageCreate"] = "messageCreate";
    DiscordEvents["messageDelete"] = "messageDelete";
    DiscordEvents["messageReactionRemoveAll"] = "messageReactionRemoveAll";
    DiscordEvents["messageReactionRemoveEmoji"] = "messageReactionRemoveEmoji";
    DiscordEvents["messageDeleteBulk"] = "messageDeleteBulk";
    DiscordEvents["messageReactionAdd"] = "messageReactionAdd";
    DiscordEvents["messageReactionRemove"] = "messageReactionRemove";
    DiscordEvents["messageUpdate"] = "messageUpdate";
    DiscordEvents["presenceUpdate"] = "presenceUpdate";
    DiscordEvents["ready"] = "ready";
    DiscordEvents["invalidated"] = "invalidated";
    DiscordEvents["roleCreate"] = "roleCreate";
    DiscordEvents["roleDelete"] = "roleDelete";
    DiscordEvents["roleUpdate"] = "roleUpdate";
    DiscordEvents["threadCreate"] = "threadCreate";
    DiscordEvents["threadDelete"] = "threadDelete";
    DiscordEvents["threadListSync"] = "threadListSync";
    DiscordEvents["threadMemberUpdate"] = "threadMemberUpdate";
    DiscordEvents["threadMembersUpdate"] = "threadMembersUpdate";
    DiscordEvents["threadUpdate"] = "threadUpdate";
    DiscordEvents["typingStart"] = "typingStart";
    DiscordEvents["userUpdate"] = "userUpdate";
    DiscordEvents["webhookUpdate"] = "webhookUpdate";
    DiscordEvents["interaction"] = "interaction";
    DiscordEvents["interactionCreate"] = "interactionCreate";
    DiscordEvents["shardDisconnect"] = "shardDisconnect";
    DiscordEvents["shardError"] = "shardError";
    DiscordEvents["shardReady"] = "shardReady";
    DiscordEvents["shardReconnecting"] = "shardReconnecting";
    DiscordEvents["shardResume"] = "shardResume";
    DiscordEvents["stageInstanceCreate"] = "stageInstanceCreate";
    DiscordEvents["stageInstanceUpdate"] = "stageInstanceUpdate";
    DiscordEvents["stageInstanceDelete"] = "stageInstanceDelete";
    DiscordEvents["stickerCreate"] = "stickerCreate";
    DiscordEvents["stickerDelete"] = "stickerDelete";
    DiscordEvents["stickerUpdate"] = "stickerUpdate";
    DiscordEvents["guildScheduledEventCreate"] = "guildScheduledEventCreate";
    DiscordEvents["guildScheduledEventUpdate"] = "guildScheduledEventUpdate";
    DiscordEvents["guildScheduledEventDelete"] = "guildScheduledEventDelete";
    DiscordEvents["guildScheduledEventUserAdd"] = "guildScheduledEventUserAdd";
    DiscordEvents["guildScheduledEventUserRemove"] = "guildScheduledEventUserRemove";
})(DiscordEvents = exports.DiscordEvents || (exports.DiscordEvents = {}));
;
class DiscordConfig {
    constructor() {
        this.token = "OTk3MTk4NDYxOTc4MDM0MjE3.GTJopc.9o5fGFBhbSOeVBzRin36_DxjxtIBMXOwukHJFc";
        this.guildId = "996703131461242982";
    }
}
exports.DiscordConfig = DiscordConfig;
;
