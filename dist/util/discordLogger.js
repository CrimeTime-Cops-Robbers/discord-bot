"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordLogger = void 0;
var ConsoleColors;
(function (ConsoleColors) {
    ConsoleColors["FgReset"] = "\u001B[0m";
    ConsoleColors["FgRed"] = "\u001B[31m";
    ConsoleColors["FgGreen"] = "\u001B[32m";
    ConsoleColors["FgYellow"] = "\u001B[33m";
    ConsoleColors["FgBlue"] = "\u001B[34m";
})(ConsoleColors || (ConsoleColors = {}));
class DiscordLogger {
    debug(message) {
        console.log(`${ConsoleColors.FgBlue}[DEBUG] ${ConsoleColors.FgReset}${message}`);
    }
    error(message) {
        console.log(`${ConsoleColors.FgRed}[ERROR] ${ConsoleColors.FgReset}${message}`);
    }
    info(message) {
        console.log(`${ConsoleColors.FgYellow}[INFO] ${ConsoleColors.FgReset}${message}`);
    }
    done(message) {
        console.log(`${ConsoleColors.FgGreen}[DONE] ${ConsoleColors.FgReset}${message}`);
    }
}
exports.DiscordLogger = DiscordLogger;
