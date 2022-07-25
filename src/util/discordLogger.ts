enum ConsoleColors {
    FgReset = "\x1b[0m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
}

export class DiscordLogger {
    public debug(message: string) {
        console.log(`${ConsoleColors.FgBlue}[DEBUG] ${ConsoleColors.FgReset}${message}`);
    }
    public error(message: string) {
        console.log(`${ConsoleColors.FgRed}[ERROR] ${ConsoleColors.FgReset}${message}`);
    }
    public info(message: string) {
        console.log(`${ConsoleColors.FgYellow}[INFO] ${ConsoleColors.FgReset}${message}`);
    }
    public done(message: string) {
        console.log(`${ConsoleColors.FgGreen}[DONE] ${ConsoleColors.FgReset}${message}`);
    }
}