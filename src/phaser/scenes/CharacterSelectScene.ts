// src/scenes/CharacterSelectScene.ts
import Phaser from "phaser";
import { PlayerType } from "../../game/constants/player-types";

export default class CharacterSelectScene extends Phaser.Scene {
  private portraits: string[] = [];

  constructor() {
    super({ key: "CharacterSelect" });
  }

  preload() {
    Object.values(PlayerType).forEach((playerType) => {
      this.load.image(playerType.image, `assets/portraits/${playerType.image}`);
    });
  }

  create() {
    this.add
      .text(400, 100, "Select Your Character", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5);

    const gridConfig = {
      startX: 100,        // Start further left
      startY: 200,        // Start higher
      columns: 6,         // Show 6 portraits per row
      spacing: {
        x: 120,         // Horizontal spacing between portraits
        y: 120          // Vertical spacing between rows
      }
    };

    Object.values(PlayerType).forEach((playerType) => {
      this.portraits.push(playerType.image);
    });

    // Dynamically create character selection options
    this.portraits.forEach((portraitKey, index) => {
      const column = index % gridConfig.columns;
      const row = Math.floor(index / gridConfig.columns);
      
      const x = gridConfig.startX + (column * gridConfig.spacing.x);
      const y = gridConfig.startY + (row * gridConfig.spacing.y);

      const character = this.add
        .image(x, y, portraitKey)
        .setInteractive()
        .setScale(2);

      // Add name label
      const playerTypeEntry = Object.values(PlayerType).find(pt => pt.image === portraitKey);
      if (playerTypeEntry) {
        this.add.text(x, y + 30, playerTypeEntry.name, {
          fontSize: '14px',
          color: '#fff'
        }).setOrigin(0.5);
      }

      this.addHoverEffects(character);
      character.on("pointerdown", () => this.selectCharacter(portraitKey));
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

  private selectCharacter(characterId: string) {
    console.log(`Selected character: ${characterId}`);

    // Transition to the main game scene
    this.scene.start("PreloadScene", { characterId });
  }
}
