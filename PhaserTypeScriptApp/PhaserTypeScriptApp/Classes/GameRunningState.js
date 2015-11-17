/// <reference path="MyGameInTs.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyGameInTs;
(function (MyGameInTs) {
    var GameRunningState = (function (_super) {
        __extends(GameRunningState, _super);
        function GameRunningState() {
            _super.call(this);
            this.xPositionCharacterMax = 850;
            this.yPositionCharacterMax = 600;
            this.countScore = 0;
            this.charListRef = ["c", "h", "a", "t"];
            this.charListToCmp = new Array();
            this.facing = "idle";
        }
        GameRunningState.prototype.gameOver = function () {
            this.phaserSprite.body.velocity.setTo(0, 0);
        };
        GameRunningState.prototype.compareArray = function (charListRef, charListCmp) {
            console.log("In compareArray()");
            var style = { font: "20px Arial", fill: "white", align: "center" };
            if (charListRef[0] != charListCmp[0]) {
                this.game.add.text(50, 50, "Dommage ! Tu t'es trompé(e) dès la première lettre. Essaie encore !", style);
                this.gameOver();
            }
            var rightLetter = 0;
            for (var i = 0; i < charListRef.length; i++) {
                if (this.charListRef[i] === charListCmp[i]) {
                    rightLetter++;
                }
            }
            console.log("Letters : " + rightLetter);
            if (rightLetter == 4 && charListCmp.length === 4) {
                this.game.add.text(50, 50, "Bravo ! Tu as réussi à placer les lettres dans le bon ordre.", style);
                this.gameOver();
            }
            if ((rightLetter >= 0 && rightLetter < 4) && (charListCmp.length === 4)) {
                this.game.add.text(50, 50, "Tu y étais presque ! Le bon ordre à donner était 'C', 'H', 'A', 'T'.", style);
                this.gameOver();
            }
        };
        GameRunningState.prototype.preload = function () {
            var backgroundLoader = this.game.load.image("green", "green.png");
            var mummyLoader = this.game.load.spritesheet("dude", "dude.png", 32, 48);
            var cLetterLoader = this.game.load.image("c", "Images/C.png");
            var hLetterLoader = this.game.load.image("h", "Images/H.png");
            var aLetterLoader = this.game.load.image("a", "Images/A.png");
            var tLetterLoader = this.game.load.image("t", "Images/T.png");
        };
        GameRunningState.prototype.create = function () {
            var graphics = this.game.add.graphics(0, 0);
            var style = { font: "40px Arial", fill: "#ff0000", align: "center" };
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.rectangleArea0 = new Phaser.Rectangle(445, 220, 60, 60);
            this.rectangleArea1 = new Phaser.Rectangle(245, 440, 60, 60);
            this.rectangleArea2 = new Phaser.Rectangle(350, 190, 60, 60);
            this.rectangleArea3 = new Phaser.Rectangle(640, 155, 60, 60);
            graphics.beginFill(0xff0000, 0.5);
            graphics.drawRect(this.rectangleArea0.x, this.rectangleArea0.y, this.rectangleArea0.height, this.rectangleArea0.width);
            graphics.drawRect(this.rectangleArea1.x, this.rectangleArea1.y, this.rectangleArea1.height, this.rectangleArea1.width);
            graphics.drawRect(this.rectangleArea2.x, this.rectangleArea2.y, this.rectangleArea2.height, this.rectangleArea2.width);
            graphics.drawRect(this.rectangleArea3.x, this.rectangleArea3.y, this.rectangleArea3.height, this.rectangleArea3.width);
            graphics.endFill();
            this.scoreText = this.game.add.text(600, 520, "Score : 0", style);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.tileSprite = this.game.add.tileSprite(0, 0, 850, 600, "green");
            this.phaserSprite = this.game.add.sprite(32, 32, "dude");
            this.game.physics.enable(this.phaserSprite, Phaser.Physics.ARCADE);
            this.cLetterSprt = this.game.add.sprite(455, 230, "c");
            this.hLetterSprt = this.game.add.sprite(255, 450, "h");
            this.aLetterSprt = this.game.add.sprite(360, 200, "a");
            this.tLetterSprt = this.game.add.sprite(650, 165, "t");
            this.phaserSprite.animations.add("left", [0, 1, 2, 3], 10, true);
            this.phaserSprite.animations.add("upOrDown", [4], false);
            this.phaserSprite.animations.add("right", [5, 6, 7, 8], 10, true);
            this.phaserSprite.body.setSize(20, 32, 5, 16);
        };
        GameRunningState.prototype.update = function () {
            console.log("Counting score: " + this.countScore + "\nFacing : " + this.facing + "\nPhaserSprite : " + this.phaserSprite);
            // PhaserMan position management
            this.input.update();
            if (this.cursors.right.isDown) {
                if (this.facing != "right") {
                    this.phaserSprite.animations.play("right");
                    this.facing = "right";
                    this.phaserSprite.body.velocity.x = 150;
                }
            }
            else if (this.cursors.left.isDown) {
                if (this.facing != "left") {
                    this.phaserSprite.animations.play("left");
                    this.facing = "left";
                    this.phaserSprite.body.velocity.x = -150;
                }
            }
            else if (this.cursors.down.isDown) {
                if (this.facing != "upOrDown") {
                    this.phaserSprite.animations.play("upOrDown");
                    this.facing = "upOrDown";
                    this.phaserSprite.body.velocity.y = 150;
                }
            }
            else if (this.cursors.up.isDown) {
                if (this.facing != "upOrDown") {
                    this.phaserSprite.animations.play("upOrDown");
                    this.facing = "upOrDown";
                    this.phaserSprite.body.velocity.y = -150;
                }
            }
            else {
                if (this.facing != "idle") {
                    this.phaserSprite.animations.stop();
                    this.phaserSprite.body.velocity.x = 0;
                    this.phaserSprite.body.velocity.y = 0;
                    if (this.facing != "right") {
                        this.phaserSprite.frame = 0;
                    }
                    else {
                        this.phaserSprite.frame = 5;
                    }
                    this.facing = "idle";
                }
            }
            // Exceeding map management, if the phaser man exceeds the map
            if (this.phaserSprite.position.x > this.xPositionCharacterMax)
                this.phaserSprite.x = 0;
            if (this.phaserSprite.position.y > this.yPositionCharacterMax)
                this.phaserSprite.y = 0;
            if (this.phaserSprite.position.x < 0)
                this.phaserSprite.x = this.xPositionCharacterMax;
            if (this.phaserSprite.position.y < 0)
                this.phaserSprite.y = this.yPositionCharacterMax;
            // Area for sprite killing! 
            if (this.rectangleArea0.contains(this.phaserSprite.x, this.phaserSprite.y)) {
                if (this.cLetterSprt.alive) {
                    this.cLetterSprt.kill();
                    this.countScore += 100;
                    this.scoreText.text = "Score : " + this.countScore;
                    this.charListToCmp.push("c");
                    this.compareArray(this.charListRef, this.charListToCmp);
                }
            }
            if (this.rectangleArea1.contains(this.phaserSprite.x, this.phaserSprite.y)) {
                if (this.hLetterSprt.alive) {
                    this.hLetterSprt.kill();
                    this.countScore += 100;
                    this.scoreText.text = "Score : " + this.countScore;
                    this.charListToCmp.push("h");
                    this.compareArray(this.charListRef, this.charListToCmp);
                }
            }
            if (this.rectangleArea2.contains(this.phaserSprite.x, this.phaserSprite.y)) {
                if (this.aLetterSprt.alive) {
                    this.aLetterSprt.kill();
                    this.countScore += 100;
                    this.scoreText.text = "Score : " + this.countScore;
                    this.charListToCmp.push("a");
                    this.compareArray(this.charListRef, this.charListToCmp);
                }
            }
            if (this.rectangleArea3.contains(this.phaserSprite.x, this.phaserSprite.y)) {
                if (this.tLetterSprt.alive) {
                    this.tLetterSprt.kill();
                    this.countScore += 100;
                    this.scoreText.text = "Score : " + this.countScore;
                    this.charListToCmp.push("t");
                    this.compareArray(this.charListRef, this.charListToCmp);
                }
            }
        };
        GameRunningState.prototype.render = function () {
            //this.game.debug.text("Render(): ", 80, 200, "Red");
        };
        return GameRunningState;
    })(Phaser.State);
    MyGameInTs.GameRunningState = GameRunningState;
})(MyGameInTs || (MyGameInTs = {}));
//# sourceMappingURL=GameRunningState.js.map