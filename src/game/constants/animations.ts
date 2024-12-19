interface AnimationConfig {
    key: string;
    frames: Phaser.Types.Animations.AnimationFrame[];
    frameRate: number;
    repeat?: number;
}

export const ANIMATIONS: Record<string, AnimationConfig> = {
    "idle-down": {
        key: "idle-down",
        frames: [],
        frameRate: 8,
        repeat: 0
    },
    "idle-up": {
        key: "idle-up",
        frames: [],
        frameRate: 8,
        repeat: 0
    },
    "idle-side": {
        key: "idle-side",
        frames: [],
        frameRate: 8,
        repeat: 0
    },
    "walk-down": {
        key: "walk-down",
        frames: [],
        frameRate: 8,
        repeat: -1
    },
    "walk-up": {
        key: "walk-up",
        frames: [],
        frameRate: 8,
        repeat: -1
    },
    "walk-side": {
        key: "walk-side",
        frames: [],
        frameRate: 8,
        repeat: -1
    }
};