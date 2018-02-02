"use strict";
var snowman8765;
(function (snowman8765) {
    var jsMiniGames;
    (function (jsMiniGames) {
        var AssetLoader = /** @class */ (function () {
            function AssetLoader(defineList) {
                var _this = this;
                this.defineList = null; // アセットの定義
                this.images = null; // 読み込んだ画像
                // アセットの読み込み
                this.loadAssets = function (onComplete) {
                    var total = _this.defineList.length; // アセットの合計数
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
                    _this.defineList.forEach(function (asset) {
                        if (asset.type == 'image') {
                            _this._loadImage(asset, onLoad);
                        }
                    });
                };
                // 画像の読み込み
                this._loadImage = function (asset, onLoad) {
                    var image = new Image();
                    image.src = asset.src;
                    image.onload = onLoad;
                    _this.images[asset.name] = image;
                };
                this.defineList = defineList;
                this.images = {};
            }
            return AssetLoader;
        }());
        jsMiniGames.AssetLoader = AssetLoader;
    })(jsMiniGames = snowman8765.jsMiniGames || (snowman8765.jsMiniGames = {}));
})(snowman8765 || (snowman8765 = {}));
