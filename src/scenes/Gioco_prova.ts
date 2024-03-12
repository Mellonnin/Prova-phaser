import { globalEval } from "jquery";
import Phaser from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
  Piattaforme: Phaser.GameObjects.Group;
  Giocatore: Phaser.Physics.Arcade.Sprite;
  //Piattaforma: Phaser.Physics.Arcade.Sprite;
  Punti: Phaser.Physics.Arcade.StaticGroup;
  Camera: Phaser.Cameras.Scene2D.Camera;
  //Cursore: Phaser.Types.Input.Keyboard.CursorKeys;
  //Controlli: Phaser.Cameras.Controls.SmoothedKeyControl;
  Punteggio: Phaser.GameObjects.BitmapText;

  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  SPACE: Phaser.Input.Keyboard.Key;

  constructor() {
    super(SceneKeys.Game);
  }

  init() {
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    this.Camera = this.cameras.main;
    this.Camera.setBounds(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      true
    );
    //this.Cursore = this.input.keyboard.createCursorKeys();
  }
  create() {

    this.Piattaforme = this.physics.add.group({
      runChildUpdate: true,
      maxSize: 100,
    });


    const spawnImage = () => {
      let _image = this.add
        .image(gameSettings.gameWidth * 0.5 * Math.random(), 0, TextureKeys.Piattaforma)
        .setOrigin(0, 2)
        .setScale(0.2)
        .setDepth(1);
      this.Piattaforme.add(_image);
    };

    this.time.addEvent({
      delay: 1000,
      callback: spawnImage,
      callbackScope: this,
      loop: true,
    });


    this.Giocatore = this.physics.add
      .sprite(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight * 1,
        TextureKeys.Giocatore
      )
      .setBounce(0, 0)
      .setCollideWorldBounds(true)
      .setDrag(0, 0)
      .setMaxVelocity(900, 900)
      .setGravity(0, 450)
      .setScale(0.2);

    this.physics.add.collider(
      this.Giocatore,
      this.Piattaforme
    );

    this.Camera.startFollow(
      this.Giocatore,
      true,
      0.05,
      0.05
    );

    //this.physics.add.collider(this.Piattaforme, this.Camera)
    //this.physics.add.overlap(this.Giocatore, this.Piattaforme, da capire come fare detectare ogni lato () => { this.Piattaforma.setY(+100)});
  }

  update(time: number, delta: number): void {
    if (this.A.isDown) {
      this.Giocatore.x -= 10;
    } else if (this.D.isDown) {
      this.Giocatore.x += 10;
    }
    if (this.S.isDown) {
      this.Giocatore.y += 10;
      //this.cameras.main.pan(0, 5, 1000, "Sine.easeInOut", true);
    } else if (this.SPACE.isDown) {
      this.Giocatore.y -= 10;
      //this.cameras.main.pan(0, 10, 1000, "Sine.easeInOut", true);
    }
    // da capire come prendere la posizione
    
  }
}
