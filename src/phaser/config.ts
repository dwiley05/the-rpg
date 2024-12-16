import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import MainScene from './scenes/MainScene';
import CharacterSelectScene from './scenes/CharacterSelectScene';

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },  
    input: {
        keyboard: true
    },
    scene: [CharacterSelectScene,PreloadScene, MainScene]  // PreloadScene must come first
}; 