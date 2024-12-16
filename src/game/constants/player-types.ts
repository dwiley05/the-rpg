interface PlayerTypeInfo {
    name: string;
    image: string;
    spriteIndex: number;
}

export const PlayerType: Record<string, PlayerTypeInfo> = {
    Boy: {
        name: 'Boy',
        image: 'Boy.png',
        spriteIndex: 0
    },
    Boy2: {
        name: 'Boy2',
        image: 'Boy2.png',
        spriteIndex: 1
    },
    Detective: {
        name: 'Detective', 
        image: 'Detective.png',
        spriteIndex: 2
    },
    FarmerBoy: {
        name: 'FarmerBoy',
        image: 'FarmerBoy.png',
        spriteIndex: 3
    },
    Girl: {
        name: 'Girl',
        image: 'Girl.png',
        spriteIndex: 4
    },
    Girl2: {
        name: 'Girl2',
        image: 'Girl2.png',
        spriteIndex: 5
    },
    Glasses: {
        name: 'Glasses',
        image: 'Glasses.png',
        spriteIndex: 6
    },
    Goblin: {
        name: 'Goblin',
        image: 'Goblin.png',
        spriteIndex: 7
    },
    Kid1: {
        name: 'Kid1',
        image: 'Kid1.png',
        spriteIndex: 8
    },
    Kid2: {
        name: 'Kid2',
        image: 'Kid2.png',
        spriteIndex: 9
    },
    Knight: {
        name: 'Knight',
        image: 'Knight.png',
        spriteIndex: 10
    },
    OldMan: {
        name: 'Old Man 1',
        image: 'old_man.png',
        spriteIndex: 11
    },
    OldMan2: {
        name: 'Old Man 2',
        image: 'old_man2.png',
        spriteIndex: 12
    },
    Punk: {
        name: 'Punk',
        image: 'Punk.png',
        spriteIndex: 13
    },
    Viking: {
        name: 'Viking',
        image: 'Viking.png',
        spriteIndex: 14
    },
    Wizard1: {
        name: 'Wizard 1',
        image: 'Wizard1.png',
        spriteIndex: 15
    },
    Wizard2: {
        name: 'Wizard 2',
        image: 'Wizard2.png',
        spriteIndex: 16
    }
} as const;
