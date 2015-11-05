/// <reference path="MyGameInTs.ts" />
var MyGameInTs;
(function (MyGameInTs) {
    var PhaserDemo = (function () {
        function PhaserDemo() {
            this.game = new Phaser.Game(850, 600, Phaser.AUTO, 'content');
            this.game.state.add("GameRunningState", MyGameInTs.GameRunningState, false);
            this.game.state.start("GameRunningState", true);
        }
        return PhaserDemo;
    })();
    MyGameInTs.PhaserDemo = PhaserDemo;
})(MyGameInTs || (MyGameInTs = {}));
//# sourceMappingURL=PhaserDemo.js.map