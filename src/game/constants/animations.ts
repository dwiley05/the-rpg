interface AnimationConfig {
    key: string;
    frames: Phaser.Types.Animations.AnimationFrame[];
    frameRate: number;
    repeat?: number;
}

export const ANIMATIONS: Record<string, AnimationConfig> = {
    "idle-down": {
        key: "idle-down",
        frames: [{ key: "characters", frame: 0 }],
        frameRate: 8
    },
    "walk-down": {
        key: "walk-down", 
        frames: [
            { key: "characters", frame: 4 },
            { key: "characters", frame: 5 }
        ],
        frameRate: 8,
        repeat: -1
    },
    "walk-up": {
        key: "walk-up",
        frames: [
            { key: "characters", frame: 6 },
            { key: "characters", frame: 7 }
        ],
        frameRate: 8,
        repeat: -1
    },
    "walk-right": {
        key: "walk-right",
        frames: [
            { key: "characters", frame: 8 },
            { key: "characters", frame: 9 }
        ],
        frameRate: 8,
        repeat: -1
    },
    "walk-left": {
        key: "walk-left",
        frames: [
            { key: "characters", frame: 8 },
            { key: "characters", frame: 9 }
        ],
        frameRate: 8,
        repeat: -1
    }
};