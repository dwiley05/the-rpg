// src/scenes/CharacterSelectScene.ts
import Phaser from "phaser";

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "CharacterSelect" });
  }

  preload() {
    this.load.atlas(
      "characters",
      "assets/characters.png",
      "assets/Characters_V3_Colour_Updated.json"
    );
  }

  create() {
    this.add
      .text(400, 100, "Select Your Character", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5);

    const gridConfig = {
      startX: 100,
      startY: 200,
      columns: 6,
      spacing: {
        x: 120,
        y: 120,
      },
    };

    const frames = this.textures.get("characters").getFrameNames();

    // Filter for only the first frame of each character
    const validCharacterFrames = frames.filter((frame) => {
      const match = frame.match(/Characters_V3_Colour (\d+)\.png/);
      if (!match) return false;
      const frameNumber = parseInt(match[1]);
      return frameNumber % 10 === 0;
    });

    // Create character selection options
    validCharacterFrames.forEach((frameKey, i) => {
      const column = i % gridConfig.columns;
      const row = Math.floor(i / gridConfig.columns);

      const x = gridConfig.startX + column * gridConfig.spacing.x;
      const y = gridConfig.startY + row * gridConfig.spacing.y;

      const character = this.add
        .image(x, y, "characters", frameKey)
        .setInteractive()
        .setScale(4);

      this.addHoverEffects(character);

      const match = frameKey.match(/Characters_V3_Colour (\d+)\.png/);
      const frameNumber = match ? parseInt(match[1]) : 0;
      const characterIndex = Math.floor(frameNumber / 10);

      character.on("pointerdown", () => {
        this.selectCharacter(characterIndex);
      });
    });
  }

  private addHoverEffects(gameObject: Phaser.GameObjects.Image) {
    gameObject.on("pointerover", () => {
      this.tweens.add({
        targets: gameObject,
        scale: gameObject.scale * 1.1,
        duration: 100,
      });
    });

    gameObject.on("pointerout", () => {
      this.tweens.add({
        targets: gameObject,
        scale: gameObject.scale / 1.1,
        duration: 100,
      });
    });
  }

  private selectCharacter(characterIndex: number) {
    // Since we're using frame numbers divisible by 10, we need to use the actual characterIndex
    this.registry.set("spriteIndex", characterIndex);
    this.scene.start("PreloadScene");
  }
}
