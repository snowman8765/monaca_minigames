"use strict";
var snowman8765;
(function (snowman8765) {
    var jsMiniGames;
    (function (jsMiniGames) {
        var Asset = /** @class */ (function () {
            function Asset(defineList) {
                this.defineList = null; // アセットの定義
                this.images = null; // 読み込んだ画像
                this.defineList = defineList;
                this.images = {};
            }
            // アセットの読み込み
            Asset.prototype.loadAssets = function (onComplete) {
                var total = this.defineList.length; // アセットの合計数
                var loadCount = 0; // 読み込み完了したアセット数
                // アセットが読み込み終わった時に呼ばれるコールバック関数
                var onLoad = function () {
                    loadCount++; // 読み込み完了数を1つ足す
                    if (loadCount >= total) {
                        // すべてのアセットの読み込みが終わった
                        onComplete();
                    }
                };
                // すべてのアセットを読み込む
                this.defineList.forEach(function (asset) {
                    switch (asset.type) {
                        case 'image':
                            this._loadImage(asset, onLoad);
                            break;
                    }
                }.bind(this));
            };
            // 画像の読み込み
            Asset.prototype._loadImage = function (asset, onLoad) {
                var image = new Image();
                image.src = asset.src;
                image.onload = onLoad;
                this.images[asset.name] = image;
            };
            return Asset;
        }());
        jsMiniGames.Asset = Asset;
    })(jsMiniGames = snowman8765.jsMiniGames || (snowman8765.jsMiniGames = {}));
})(snowman8765 || (snowman8765 = {}));
