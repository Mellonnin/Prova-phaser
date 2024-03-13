import { globalEval } from "jquery";
import Phaser, { Physics } from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_provaMazzuolo extends Phaser.Scene {
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
  platforms: Phaser.Physics.Arcade.StaticGroup;
  x: number;
  y: number;
  counter:number;
  npiattaforme:number;
  maluses: Phaser.Physics.Arcade.StaticGroup;
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
    console.log("scena mazzuolo");
    
    this.cameras.main.setBackgroundColor('#3498db'); // Imposta lo sfondo blu
  
    this.npiattaforme = 0;
    this.counter = 0;
    this.platforms = this.physics.add.staticGroup();
    const firstPlatform = this.platforms.create(
      gameSettings.gameWidth/2,
      gameSettings.gameHeight-50 ,
      TextureKeys.Piattaforma
    ).setScale(1.5);
    const firstPlatformBody = firstPlatform.body;
    firstPlatformBody.updateFromGameObject();

    this.maluses = this.physics.add.staticGroup();

    this.x = (gameSettings.gameWidth/3);
    this.y = 100/*
    for(let i = 0; i < 4; i++)
    {
      if(i % 2 == 0) this.x *= 2;
      else this.x /= 2;
      this.npiattaforme++;

      /** @type {Phaser.Physics.Arcade.Sprite} *//*
      const platform = this.platforms.create(this.x, this.y, TextureKeys.Piattaforma);

      platform.setScale(1.5)

      this.platforms.add(platform)
      if(this.npiattaforme % 2 == 0){//creazione malus
        const malus = this.maluses.create(platform.x, (platform.y-platform.height), TextureKeys.Redcross);
        const bodyMalus = malus.body as Physics.Arcade.StaticBody
        bodyMalus.updateFromGameObject()
      }
      this.y += 200;
      //this.physics.add.collider(this._pou, this.platforms);

      const body = platform.body as Physics.Arcade.StaticBody
      body.updateFromGameObject()
    }
*/
    // da capire come prendere la posizione

      this.Giocatore = this.physics.add
      .sprite(
        // firstPlatform.x,
        // firstPlatform.y-firstPlatform.height,
        600,
        500,
        TextureKeys.Giocatore
      )
      .setBounce(1, 1)
      .setCollideWorldBounds(true)
      .setDrag(0.1, 0.1)
      .setMaxVelocity(900, 900)
      .setGravity(0, 450)
      .setScale(0.8)
      .setFriction(0.5, 0.5);

    this.physics.add.collider(
      this.Giocatore,
      this.platforms
    );

    this.physics.add.collider(
      this.maluses,
      this.platforms
    );

    this.physics.add.overlap(
      this.Giocatore,
      this.maluses
    );


    /*this.Camera.startFollow(
      this.Giocatore,
      true,
      0.05,
      0.05
    );*/
    this.physics.add.collider(this.platforms, this.Giocatore);
    this.physics.add.overlap(this.Giocatore, this.platforms);
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
      this.Giocatore.setVelocityX(-10);
    } else if (this.D.isDown) {
      this.Giocatore.setVelocityX(+10);
    }
    if (this.S.isDown) {
      this.Giocatore.setAccelerationY(-10);
      //this.cameras.main.pan(0, 5, 1000, "Sine.easeInOut", true);
    } else if (this.SPACE.isDown) {
      this.Giocatore.setAccelerationY(10);
      //this.cameras.main.pan(0, 10, 1000, "Sine.easeInOut", true);
    }
    
  
    
    if(this.npiattaforme<4){
      for(let i = 0; i < 4; i++){
        if(i % 2 == 0) this.x *= 2;
        else this.x /= 2;
        this.npiattaforme++;

        /** @type {Phaser.Physics.Arcade.Sprite} */
        const platform = this.platforms.create(this.x, this.y, TextureKeys.Piattaforma);

        platform.setScale(1.5)

        this.platforms.add(platform)
        if(this.npiattaforme % 2 == 0){//creazione malus
          const malus = this.maluses.create(platform.x, (platform.y-platform.height), TextureKeys.Redcross);
          const bodyMalus = malus.body as Physics.Arcade.StaticBody
          bodyMalus.updateFromGameObject()
          this.maluses.add(malus)
        }
        this.y += 200;
        //this.physics.add.collider(this._pou, this.platforms);

        const body = platform.body as Physics.Arcade.StaticBody
        body.updateFromGameObject()
      }
    }
    
    this.physics.add.overlap(this.Giocatore, this.maluses, (Giocatore, malus) => {
      malus.destroy();
      this.counter++;
      console.log(`Malus presi: ${this.counter}`);//prova
      ////decrementa count

      
    });
  

  //  if(this.maluses.)

  }
}
