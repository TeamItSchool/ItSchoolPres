/// <reference path="MyGameInTs.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyGameInTs;
(function (MyGameInTs) {
    var TitleScreenState = (function (_super) {
        __extends(TitleScreenState, _super);
        function TitleScreenState() {
            _super.call(this);
        }
        TitleScreenState.prototype.preload = function () {
            this.load.image("jet", "jet.png");
        };
        TitleScreenState.prototype.create = function () {
            this.titleScreenImage = this.add.sprite(0, 0, "jet");
        };
        return TitleScreenState;
    })(Phaser.State);
    MyGameInTs.TitleScreenState = TitleScreenState;
})(MyGameInTs || (MyGameInTs = {}));
//# sourceMappingURL=TitleScreenState.js.map