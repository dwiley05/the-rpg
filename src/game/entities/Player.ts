import Phaser from "phaser";
import { ANIMATIONS } from "../constants/animations";

export default class Player {
  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private speed: number = 160;
  private currentSpriteIndex: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.currentSpriteIndex = scene.registry.get("spriteIndex") || 0;
    const baseFrame = this.currentSpriteIndex * 10;

    this.player = scene.physics.add.sprite(
      x,
      y,
      "characters",
      `Characters_V3_Colour ${baseFrame}.png`
    );
    this.player.setCollideWorldBounds(true);
    this.player.setScale(3);
    this.cursors = scene.input.keyboard?.createCursorKeys();

    // Destroy any existing animations for this character
    this.destroyExistingAnimations(scene);
    this.createAnimations(scene);
  }

  private destroyExistingAnimations(scene: Phaser.Scene) {
    // Only destroy the animations for our specific keys
    const animationKeys = [
      "idle-down",
      "idle-up",
      "idle-side",
      "walk-down",
      "walk-up",
      "walk-side",
    ];

    animationKeys.forEach((key) => {
      if (scene.anims.exists(key)) {
        scene.anims.remove(key);
      }
    });
  }

  private createAnimations(scene: Phaser.Scene) {
    const baseFrame = this.currentSpriteIndex * 10;
    const maxFrameNumber = 199;

    const getValidFrame = (frameNum: number) => {
      if (frameNum > maxFrameNumber) {
        return baseFrame;
      }
      return frameNum;
    };

    // Create animations with frame validation
    scene.anims.create({
      key: "walk-down",
      frameRate: 8,
      repeat: -1,
      frames: [
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 4)}.png`,
        },
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 5)}.png`,
        },
      ],
    });

    scene.anims.create({
      key: "walk-up",
      frameRate: 8,
      repeat: -1,
      frames: [
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 6)}.png`,
        },
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 7)}.png`,
        },
      ],
    });

    scene.anims.create({
      key: "walk-side",
      frameRate: 8,
      repeat: -1,
      frames: [
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 8)}.png`,
        },
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 9)}.png`,
        },
      ],
    });

    // Idle animations with frame validation
    scene.anims.create({
      key: "idle-down",
      frameRate: 8,
      repeat: 0,
      frames: [
        { key: "characters", frame: `Characters_V3_Colour ${baseFrame}.png` },
      ],
    });

    scene.anims.create({
      key: "idle-up",
      frameRate: 8,
      repeat: 0,
      frames: [
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 1)}.png`,
        },
      ],
    });

    scene.anims.create({
      key: "idle-side",
      frameRate: 8,
      repeat: 0,
      frames: [
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 2)}.png`,
        },
      ],
    });

    // Set initial frame and state
    this.player.setFrame(`Characters_V3_Colour ${baseFrame}.png`);
  }

  update() {
    if (!this.cursors) return;

    let isMoving = false;
    let currentAnim = "";

    // Handle horizontal movement
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player.setFlipX(true);
      currentAnim = "walk-side";
      isMoving = true;
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.setFlipX(false);
      currentAnim = "walk-side";
      isMoving = true;
    } else {
      this.player.setVelocityX(0);
    }

    // Handle vertical movement
    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-this.speed);
      currentAnim = "walk-up";
      isMoving = true;
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(this.speed);
      currentAnim = "walk-down";
      isMoving = true;
    } else {
      this.player.setVelocityY(0);
    }

    // Handle animations
    if (isMoving && currentAnim) {
      if (this.player.anims.currentAnim?.key !== currentAnim) {
        this.player.anims.play(currentAnim, true);
      }
    } else {
      // Set idle animation based on last movement
      const lastAnim = this.player.anims.currentAnim?.key || "idle-down";
      if (lastAnim.includes("up")) {
        this.player.anims.play("idle-up", true);
      } else if (lastAnim.includes("side")) {
        this.player.anims.play("idle-side", true);
        // Maintain flip state for side idle
        this.player.setFlipX(this.player.flipX);
      } else {
        this.player.anims.play("idle-down", true);
      }
    }
  }

  getSprite() {
    return this.player;
  }
}
