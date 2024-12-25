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
    const animations = Object.keys(ANIMATIONS);

    animations.forEach((key) => {
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
      key: ANIMATIONS["walk-down"].key,
      frameRate: ANIMATIONS["walk-down"].frameRate,
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
      key: ANIMATIONS["walk-up"].key,
      frameRate: ANIMATIONS["walk-up"].frameRate,
      repeat: ANIMATIONS["walk-up"].repeat,
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
      key: ANIMATIONS["walk-side"].key,
      frameRate: ANIMATIONS["walk-side"].frameRate,
      repeat: ANIMATIONS["walk-side"].repeat,
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
      key: ANIMATIONS["idle-down"].key,
      frameRate: ANIMATIONS["idle-down"].frameRate,
      repeat: ANIMATIONS["idle-down"].repeat,
      frames: [
        { key: "characters", frame: `Characters_V3_Colour ${baseFrame}.png` },
      ],
    });

    scene.anims.create({
      key: ANIMATIONS["idle-up"].key,
      frameRate: ANIMATIONS["idle-up"].frameRate,
      repeat: ANIMATIONS["idle-up"].repeat,
      frames: [
        {
          key: "characters",
          frame: `Characters_V3_Colour ${getValidFrame(baseFrame + 1)}.png`,
        },
      ],
    });

    scene.anims.create({
      key: ANIMATIONS["idle-side"].key  ,
      frameRate: ANIMATIONS["idle-side"].frameRate,
      repeat: ANIMATIONS["idle-side"].repeat,
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
      currentAnim = ANIMATIONS["walk-side"].key;
      isMoving = true;
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.setFlipX(false);
      currentAnim = ANIMATIONS["walk-side"].key;
      isMoving = true;
    } else {
      this.player.setVelocityX(0);
    }

    // Handle vertical movement
    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-this.speed);
      currentAnim = ANIMATIONS["walk-up"].key;
      isMoving = true;
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(this.speed);
      currentAnim = ANIMATIONS["walk-down"].key;
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
      const lastAnim = this.player.anims.currentAnim?.key || ANIMATIONS["idle-down"].key;
      if (lastAnim.includes(ANIMATIONS["idle-up"].key)) {
        this.player.anims.play(ANIMATIONS["idle-up"].key, true);
      } else if (lastAnim.includes(ANIMATIONS["idle-side"].key)) {
        this.player.anims.play(ANIMATIONS["idle-side"].key, true);
        // Maintain flip state for side idle
        this.player.setFlipX(this.player.flipX);
      } else {
        this.player.anims.play(ANIMATIONS["idle-down"].key, true);
      }
    }
  }

  getSprite() {
    return this.player;
  }
}
