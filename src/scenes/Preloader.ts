import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.cameras.main.setBackgroundColor("#05d3f2");

    this.load.image(TextureKeys.Giocatore, "assets/images/logo.jpg");
    this.load.image(TextureKeys.Punti, "assets/images/logo.jpg");
    this.load.image(TextureKeys.Piattaforma, "assets/images/logo.jpg");
  }

  create() {
    this.scene.stop(SceneKeys.Preloader);
    this.scene.start(SceneKeys.Game);
  }
}
