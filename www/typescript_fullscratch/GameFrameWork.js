"use strict";
var snowman8765;
(function (snowman8765) {
    var jsMiniGames;
    (function (jsMiniGames) {
        var GameFrameWork = /** @class */ (function () {
            function GameFrameWork(assets) {
                var _this = this;
                this.init = function () {
                    _this.canvas = document.getElementById('maincanvas');
                    _this.ctx = _this.canvas.getContext('2d');
                    _this.canvas.width = _this.width;
                    _this.canvas.height = _this.height;
                    _this.assets.loadAssets(function () {
                        // アセットがすべて読み込み終わったら、
                        // ゲームの更新処理を始めるようにする
                        //window.requestAnimationFrame(this.update);
                    });
                    window.requestAnimationFrame(_this.update);
                };
                this.update = function () {
                    _this.render();
                    window.requestAnimationFrame(_this.update);
                };
                this.render = function () {
                    // 全体をクリア
                    _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                    // 背景を表示
                    _this.ctx.drawImage(_this.assets.images.back, 0, 0);
                    // みかん箱を表示
                    _this.ctx.drawImage(_this.assets.images.box, 0, 0);
                };
                this.assets = assets;
                var bound = setBound();
                this.width = bound.width;
                this.height = bound.height;
            }
            return GameFrameWork;
        }());
        jsMiniGames.GameFrameWork = GameFrameWork;
    })(jsMiniGames = snowman8765.jsMiniGames || (snowman8765.jsMiniGames = {}));
})(snowman8765 || (snowman8765 = {}));
