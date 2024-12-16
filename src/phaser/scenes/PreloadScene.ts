import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Load the tileset image
    this.load.image('tiles', '/assets/tilemap.png');
    
    // Load the tilemap JSON
    this.load.tilemapTiledJSON('map', '/assets/JoeRpgMap.json');
    
    // Load new character spritesheet
    this.load.spritesheet('characters', 
        '/assets/characters.png',  // Your new sprite sheet
        { 
            frameWidth: 16,    // Each character frame is 16x16
            frameHeight: 16,
            spacing: 0
        }
    );
  }

  create() {
    console.log('Assets loaded successfully');
    this.scene.start('MainScene');
  }
}