import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    // Load the tileset image
    this.load.image("tiles", "/assets/tilemap.png");

    // Load the tilemap JSON
    this.load.tilemapTiledJSON("map", "/assets/JoeRpgMap.json");

    // Load characters spritesheet
    this.load.spritesheet(
      "characters",
      "/assets/characters.png", 
      {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 0,
      }
    );
  }

  create() {
    const spriteIndex = this.registry.get("spriteIndex");
    this.scene.start("MainScene", { spriteIndex });
  }
}