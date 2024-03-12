import "phaser"

import Preloader from "./scenes/Preloader"

import { gameSettings } from "./consts/GameSettings"
import Gioco_prova from "./scenes/Gioco_prova"

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
  ],
}

export default new Phaser.Game(config)
