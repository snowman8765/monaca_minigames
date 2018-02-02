"use strict";
var snowman8765;
(function (snowman8765) {
    var jsMiniGames;
    (function (jsMiniGames) {
        var Game = /** @class */ (function () {
            function Game(width, height, assets) {
                this.width = 800;
                this.height = 600;
                this.canvas = null;
                this.ctx = null;
                this.assets = null;
                this.width = width;
                this.height = height;
                this.assets = assets;
            }
            Game.prototype.init = function () {
                this.canvas = document.getElementById('maincanvas');
                this.ctx = this.canvas.getContext('2d');
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.assets.loadAssets(function () {
                    // アセットがすべて読み込み終わったら、
                    // ゲームの更新処理を始めるようにする
                    window.requestAnimationFrame(this.update.bind(this));
                }.bind(this));
                //window.requestAnimationFrame(this.update.bind(this));
            };
            Game.prototype.update = function () {
                this.render();
                window.requestAnimationFrame(this.update.bind(this));
            };
            Game.prototype.render = function () {
                // 全体をクリア
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                if (this.assets.images.length > 0) {
                    // 背景を表示
                    this.ctx.drawImage(this.assets.images['back'], 0, 0);
                    // みかん箱を表示
                    this.ctx.drawImage(this.assets.images['box'], 0, 0);
                }
            };
            return Game;
        }());
        jsMiniGames.Game = Game;
    })(jsMiniGames = snowman8765.jsMiniGames || (snowman8765.jsMiniGames = {}));
})(snowman8765 || (snowman8765 = {}));
