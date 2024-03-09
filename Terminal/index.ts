import * as readline from 'readline-sync';

//Interfaces gebruiken
import { UserData, GamingSetup } from './interfaces';

// Lees de inhoud van fortnite.json en gamingsetup.json
const fortniteData = "https://raw.githubusercontent.com/BelhajOuail/TerminalApp/master/Terminal/fortnite.json";
const gamingSetupData = "https://raw.githubusercontent.com/BelhajOuail/TerminalApp/master/Terminal/gamingSetup.json";

console.log('Welcome to the JSON data viewer!');
let indexChoice: number;

do {
    const choices: string[] = ["View all data", "Filter by ID"];
    indexChoice = readline.keyInSelect(choices, "Choose an option: ");

    switch (indexChoice) {
        case 0:
            viewAllData();
            break;
        case 1:
            FilterOnID()
        default:
            break;
    }



} while (indexChoice > 3);

async function viewAllData() {
    try {

        const fortniteResponse = await fetch(fortniteData);
        const fortiteParsed: UserData[] = await fortniteResponse.json();

        for (const fortniteData of fortiteParsed) {
            console.log(`- ${fortniteData.username} (${fortniteData.id})`);
        }
    }
    catch (error: any) {
        console.log(error);
    }

}


async function FilterOnID() {

    try {


        const fortniteResponse = await fetch(fortniteData);
        const fortiteParsed: UserData[] = await fortniteResponse.json();

        let filterid: number = Number(readline.question("Please enter the ID you want to filter by: "));
        const filteredUser: UserData | undefined = fortiteParsed.find(user => user.id === filterid);

        if (filteredUser) {
            if (filteredUser) {
                console.log(`ID: ${filteredUser.id}`);
                console.log(`Username: ${filteredUser.username}`);
                console.log(`Description: ${filteredUser.description}`);
                console.log(`Age: ${filteredUser.age}`);
                console.log(`Active: ${filteredUser.active}`);
                console.log(`Birthdate: ${filteredUser.birthdate}`);
                console.log(`Profile Image URL: ${filteredUser.profileImageUrl}`);
                console.log(`Played Modes: ${filteredUser.playedModes.join(', ')}`);
                console.log(`Gaming Setup:`);
            }
            filteredUser.gamingSetup.forEach(setup => {
                console.log(`- Monitor: ${setup.monitor}`);
                console.log(`- Mouse: ${setup.mouse}`);
                console.log(`- Keyboard: ${setup.keyboard}`);
                console.log(`- Headset: ${setup.headset}`);
            });
        }
        else {
            console.log(`No Pokémon found with ID: ${filterid}`);
        }
    } catch (error: any) {
        console.log(error);
    }

}

export{}