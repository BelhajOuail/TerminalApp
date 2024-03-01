// Interface voor gebruikersgegevens
export interface UserData {
    id: number;
    username: string;
    description: string;
    age: number;
    active: boolean;
    birthdate: string;
    profileImageUrl: string;
    playedModes: string[];
    gamingSetup: GamingSetup;
}

// Interface voor gaming setup
export interface GamingSetup {
    id: number;
    monitor: string;
    mouse: string;
    keyboard: string;
    headset: string;
}