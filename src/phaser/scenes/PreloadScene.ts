import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    // Load the tileset image - make sure path matches public folder structure
    this.load.image("tiles", "assets/tilemap.png");

    // Load the tilemap JSON - make sure path matches public folder structure
    this.load.tilemapTiledJSON("map", "assets/JoeRpgMap.json");

    // Load characters spritesheet - updated to match actual filename
    this.load.atlas(
      'characters',
      'assets/characters.png',
      'assets/Characters_V3_Colour_Updated.json'  // Changed to match actual file
    );
  }

  create() {
    const spriteIndex = this.registry.get("spriteIndex");
    this.scene.start("MainScene", { spriteIndex });
  }
}