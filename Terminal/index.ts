import * as readline from 'readline';
import * as fs from 'fs';
import { UserData, GamingSetup } from './interfaces';

// Functie om de gegevens uit te lezen
function readJSONFile(filePath: string): UserData[] {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}

// Functie om gegevens weer te geven
function displayUserData(userData: UserData[]): void {
    userData.forEach(user => {
        console.log(`ID: ${user.id}`);
        console.log(`Username: ${user.username}`);
        console.log(`Description: ${user.description}`);
        console.log(`Age: ${user.age}`);
        console.log(`Active: ${user.active}`);
        console.log(`Birthdate: ${user.birthdate}`);
        console.log(`Profile Image URL: ${user.profileImageUrl}`);
        console.log(`Played Modes: ${user.playedModes.join(', ')}`);
        console.log(`Gaming Setup:`);
        displayGamingSetup(user.gamingSetup);
        console.log('--------------------------------------------');
    });
}


function displayGamingSetup(gamingSetup: GamingSetup): void {
    console.log(`- Monitor: ${gamingSetup.monitor}`);
    console.log(`- Mouse: ${gamingSetup.mouse}`);
    console.log(`- Keyboard: ${gamingSetup.keyboard}`);
    console.log(`- Headset: ${gamingSetup.headset}`);
}


function filterByID(userData: UserData[], id: number): UserData | null {
    return userData.find(user => user.id === id) || null;
}

// Functie om het menu weer te geven
function displayMenu(): void {
    console.log('\nWelcome to the JSON data viewer!\n');
    console.log('1. View all data');
    console.log('2. Filter by ID');
    console.log('3. Exit');
}


function run(): void {
    const userData = readJSONFile('fortnite.json');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    displayMenu();

    rl.question('Please enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                displayUserData(userData);
                break;
            case '2':
                rl.question('Enter the ID to filter: ', (id) => {
                    const filteredUser = filterByID(userData, parseInt(id));
                    if (filteredUser) {
                        console.log('Filtered User:');
                        console.log(filteredUser);
                    } else {
                        console.log('User with specified ID not found.');
                    }
                    rl.close();
                });
                break;
            case '3':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                rl.close();
        }
    });
}

run();
