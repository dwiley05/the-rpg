import 'phaser';
import MainScene from './phaser/scenes/MainScene';

class PhaseGame extends Phaser.Game {
    constructor() {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: [MainScene]
        };
        super(config);
    }
}
