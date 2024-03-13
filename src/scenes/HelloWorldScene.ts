import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import { gameSettings } from "../consts/GameSettings";

export default class HelloWorldScene extends Phaser.Scene {
  private Giocatore!: Phaser.Physics.Arcade.Sprite;
  private Cursore!: Phaser.Types.Input.Keyboard.CursorKeys;
  private Camera!: Phaser.Cameras.Scene2D.Camera;
  private A!: Phaser.Input.Keyboard.Key;
  private D!: Phaser.Input.Keyboard.Key;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.load.image("sfondo", "assets/assets/images/sfondo.png");
    this.load.image("000", "/assets/assets/images/Character/Walk/Left/000.png");
    this.load.image("platform", "/assets/assets/images/platform.png");
    this.load.image(
      "003",
      "/assets/assets/images/Character/Death/Left/Animation/0003.png"
    );
  }

  init() {
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.cameras.main.setBounds(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height * 2
    );

    this.Camera = this.cameras.main;
    this.Cursore = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.createGiocatore();
    // this.createPlatform();
    this.createGroup();
  }

  update(time: number, delta: number): void {
    if (this.A.isDown) {
      this.Giocatore.x -= 5;
    } else if (this.D.isDown) {
      this.Giocatore.x += 5;
    }
  }

  private createBackground() {
    this.add.image(403.75, 323, "sfondo");
  }

  private createGiocatore() {
    this.Giocatore = this.physics.add
      .sprite(403.75, 300, "003")
      .setCollideWorldBounds(true)
      .setBounce(0, 1)
      .setScale(2)
      .setSize(60, 5)
      .setOffset(0, 55);
  }

  private createPlatform() {
    this.physics.add
      .sprite(403.75, 500, "platform")
      .setCollideWorldBounds(true)
      .setScale(0.3)
      .setSize(881, 15)
      .setOffset(0, 210);
  }

  private createGroup() {
    const myGroup = this.physics.add.group({
      runChildUpdate: true,
      maxSize: 100,
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const point = this.cameras.main.worldView.getRandomPoint();
        const image = this.add
          .image(point.x, 0, "platform")
          .setOrigin(0, 2)
          .setScale(0.2)
          .setDepth(1);
        myGroup.add(image);
      },
      callbackScope: this,
      loop: true,
    });
  }
}
