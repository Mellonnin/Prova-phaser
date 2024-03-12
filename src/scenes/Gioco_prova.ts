import { globalEval } from "jquery";
import Phaser from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
  Piattaforme: Phaser.GameObjects.Group;
  Giocatore: Phaser.Physics.Arcade.Sprite;
  Piattaforma: Phaser.Physics.Arcade.Sprite;
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
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //this.Camera = this.cameras.main;
    //this.Camera.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height, true);
    //this.Cursore = this.input.keyboard.createCursorKeys();
  }
  create() {
    this.Piattaforme = this.physics.add.group({
      runChildUpdate: true,
      maxSize: 100,
    });
    const spawnImage = () => {
      this.Piattaforme = this.add.physics.add
        .sprite(
          gameSettings.gameWidth * Math.random(),
          gameSettings.gameHeight * Math.random(),
          TextureKeys.Piattaforma
        )
        .setScale(0.2)
        .setBounce(0, 0)
        .setCollideWorldBounds(true)
        .setDrag(0.1, 0.1)
        .setMaxVelocity(900, 900)
        .setGravity(0, 450)
        .setScale(0.2)
        .setFriction(0.5, 0.5)
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

    // creo l'immagine nel gruppo
    // this.Piattaforma = this.physics.add
    //   .sprite(
    //     gameSettings.gameWidth * 0.5,
    //     gameSettings.gameHeight,
    //     TextureKeys.Piattaforma
    //   )
    //   .setBounce(0, 0)
    //   .setCollideWorldBounds(true)
    //   .setDrag(0, 0)
    //   .setMaxVelocity(900, 900)
    //   .setGravity(0, 900)
    //   .setScale(0.2)
    //   .setFriction(0.5, 0.5);

    this.Giocatore = this.physics.add
      .sprite(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight,
        TextureKeys.Giocatore
      )
      .setBounce(0, 0)
      .setCollideWorldBounds(true)
      .setDrag(0.1, 0.1)
      .setMaxVelocity(900, 900)
      .setGravity(0, 450)
      .setScale(0.2)
      .setFriction(0.5, 0.5);

    //this.Camera.startFollow(this.Giocatore, true, 0.05, 0.05);
  }

  update(time: number, delta: number): void {
    this.physics.add.collider(this.Giocatore, this.Piattaforma);

    this.physics.add.overlap(this.Giocatore, this.Piattaforma, () => {
      if (this.Giocatore.body.touching.up) {
        this.Giocatore.setVelocityY(-5000);
      } else if (this.Giocatore.body.touching.down) {
        this.Giocatore.setVelocityY(5000);
      } else if (this.Giocatore.body.touching.left) {
        this.Giocatore.setVelocityX(5000);
      } else if (this.Giocatore.body.touching.right) {
        this.Giocatore.setVelocityX(-5000);
      }
    });

    const speed = 500;

    this.Giocatore.setVelocity(0);

    if (this.A.isDown) {
      this.Giocatore.setVelocityX(-speed);
    } else if (this.D.isDown) {
      this.Giocatore.setVelocityX(speed);
    }
    if (this.S.isDown) {
      this.Giocatore.setVelocityY(speed);
      //this.cameras.main.pan(0, 5, 1000, "Sine.easeInOut", true);
    } else if (this.SPACE.isDown) {
      this.Giocatore.setVelocityY(-speed + 200);
      //this.cameras.main.pan(0, 10, 1000, "Sine.easeInOut", true);
    }
  }
}
