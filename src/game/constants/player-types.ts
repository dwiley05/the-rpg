interface PlayerTypeInfo {
    name: string;
    image: string;
}

export const PlayerType: Record<string, PlayerTypeInfo> = {
    Boy: {
        name: 'Boy',
        image: 'Boy.png'
    },
    Boy2: {
        name: 'Boy2',
        image: 'Boy2.png'
    },
    Detective: {
        name: 'Detective',
        image: 'Detective.png'
    },
    FarmerBoy: {
        name: 'FarmerBoy',
        image: 'FarmerBoy.png'
    },
    Girl: {
        name: 'Girl',
        image: 'Girl.png'
    },
    Girl2: {
        name: 'Girl2',
        image: 'Girl2.png'
    },
    Glasses: {
        name: 'Glasses',
        image: 'Glasses.png'
    },
    Goblin: {
        name: 'Goblin',
        image: 'Goblin.png'
    },
    Kid1: {
        name: 'Kid1',
        image: 'Kid1.png'
    },
    Kid2: {
        name: 'Kid2',
        image: 'Kid2.png'
    },
    Knight: {
        name: 'Knight',
        image: 'Knight.png'
    },
    OldMan: {
        name: 'Old Man 1',
        image: 'old_man.png'
    },
    OldMan2: {
        name: 'Old Man 2',
        image: 'old_man2.png'
    },
    Punk: {
        name: 'Punk',
        image: 'Punk.png'
    },
    Viking: {
        name: 'Viking',
        image: 'Viking.png'
    },
    Wizard1: {
        name: 'Wizard 1',
        image: 'Wizard1.png'
    },
    Wizard2: {
        name: 'Wizard 2',
        image: 'Wizard2.png'
    }
} as const;
