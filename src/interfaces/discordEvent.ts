export interface DiscordEvent {
    name: string;
    register(): void;
    run(args?: any[]): void;
}