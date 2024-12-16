import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
    protected createAnimation(config: {
        key: string,
        frames: number[],
        frameRate?: number,
        repeat?: number
    }) {
        this.anims.create({
            key: config.key,
            frames: config.frames.map(frame => ({ key: 'characters', frame })),
            frameRate: config.frameRate ?? 8,
            repeat: config.repeat ?? -1
        });
    }
}