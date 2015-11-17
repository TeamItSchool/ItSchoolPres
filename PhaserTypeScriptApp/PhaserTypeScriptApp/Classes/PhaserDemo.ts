/// <reference path="MyGameInTs.ts" />

module MyGameInTs {
    export class PhaserDemo {

        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(850, 600, Phaser.AUTO, 'content');
            this.game.state.add("GameRunningState", GameRunningState, false);
            this.game.state.start("GameRunningState", true);
        }
    }
}

