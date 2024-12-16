export default class HealthBar {
  private healthBar!: Phaser.GameObjects.Graphics;
  private player!: Phaser.Physics.Arcade.Sprite;
  private maxHealth: number = 100;
  private currentHealth: number = 100;

  constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    this.healthBar = scene.add.graphics();
    this.player = player;
  }

  private updateHealthBar() {
    this.healthBar.clear();

    // Background (red)
    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(this.player.x - 25, this.player.y - 40, 50, 5);

    // Health (green)
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(
      this.player.x - 25,
      this.player.y - 40,
      (this.currentHealth / this.maxHealth) * 50,
      5
    );
  }

  decreaseHealth(amount: number) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.updateHealthBar();
  }
}
