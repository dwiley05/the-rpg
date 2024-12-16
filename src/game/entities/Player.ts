import Phaser from "phaser";
import { ANIMATIONS } from "../constants/animations";

export default class Player {
  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  private speed: number = 160;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.player = scene.physics.add.sprite(x, y, "characters", 0);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(3);
    this.cursors = scene.input.keyboard?.createCursorKeys();
    this.createAnimations(scene);
  }

  private createAnimations(scene: Phaser.Scene) {
    Object.values(ANIMATIONS).forEach((anim) => {
      scene.anims.create(anim);
    });
  }

  update() {
    if (!this.cursors) return;

    let isMoving = false;

    // Handle horizontal movement
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player.setFlipX(true);
      this.player.anims.play('walk-left', true);
      isMoving = true;
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.setFlipX(false);
      this.player.anims.play('walk-right', true);
      isMoving = true;
    } else {
      this.player.setVelocityX(0);
    }

    // Handle vertical movement
    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-this.speed);
      this.player.anims.play('walk-up', true);
      isMoving = true;
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(this.speed);
      this.player.anims.play('walk-down', true);
      isMoving = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!isMoving) {
      this.player.anims.play('idle-down', true);
    }
  }

  getSprite() {
    return this.player;
  }
}
