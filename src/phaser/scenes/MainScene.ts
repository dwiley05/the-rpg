import Phaser from 'phaser';
import Player from '../../game/entities/Player';
import HealthBar from '../../game/entities/UI/HealthBar';

export default class MainScene extends Phaser.Scene {
  private player!: Player;
  private healthBar!: HealthBar;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // Create the tilemap
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('RPG Tileset', 'tiles');
    
    if (tileset) {
      const layer = map.createLayer('Tile Layer 1', [tileset], 0, 0);
      layer?.setScale(2);
    }

    // Create player and health bar
    this.player = new Player(this, 100, 100);
    this.healthBar = new HealthBar(this, this.player.getSprite());

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player.getSprite());
    this.cameras.main.setZoom(1);
  }

  update() {
    // Update player movement and animations
    this.player.update();

    // Test health decrease with Q key
    if (this.input.keyboard?.addKey('Q').isDown) {
      this.healthBar.decreaseHealth(1);
    }
  }
}
