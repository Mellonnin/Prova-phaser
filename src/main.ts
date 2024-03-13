import "phaser"

import Preloader from "./scenes/Preloader"

import { gameSettings } from "./consts/GameSettings"
import Gioco_prova from "./scenes/Gioco_prova"
import Gioco_provaMazzuolo from "./scenes/Gioco_provaMazzuolo"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: gameSettings.bgColor,
  parent: "my-game",
  scale: {
    mode: Phaser.Scale.FIT,
    width: gameSettings.gameWidth,
    height: gameSettings.gameHeight,
  },

  physics: {
    default: "arcade",
    arcade: { 
      gravity: gameSettings.gravity,
      debug: gameSettings.debug 
    }
  },

  scene: [
    Preloader,
    Gioco_prova,
    //Gioco_provaMazzuolo,
  ],
}

export default new Phaser.Game(config)
