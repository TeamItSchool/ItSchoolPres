/// <reference path="MyGameInTs.ts" />

module MyGameInTs {

    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        titleScreenImage: Phaser.Sprite;

        constructor() {
            super();
        }

        preload() {
            this.load.image("jet", "jet.png");
        }

        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "jet");
        }
    }
}