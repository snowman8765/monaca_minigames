// http://www.pixijs.com/tutorials
// https://qiita.com/standard-software/items/82cfad075decd42aba92
// http://tech.leihauoli.com/post/2014/11/10/program-design-1.html
//import Card from './object/Card';
var snowman8765;
(function (snowman8765) {
    var jsMiniGames;
    (function (jsMiniGames) {
        var Game = /** @class */ (function () {
            function Game(width, height) {
                this.app = null;
                console.log("constructor");
                //this.setup = this.setup.bind(this);
                this.app = new PIXI.Application({
                    width: width,
                    height: height,
                    antialias: true,
                    transparent: false,
                    resolution: 1
                });
            }
            Game.prototype.init = function () {
                console.log("init:this=" + this);
                //Add the canvas that Pixi automatically created for you to the HTML document
                document.body.appendChild(this.app.view);
                //load an image and run the `setup` function when it's done
                PIXI.loader
                    .add("img/ball.png")
                    .load(this.setup);
                console.log("init:this.setup=" + this.setup);
            };
            Game.prototype.setup = function () {
                var _ = miniGame; // PIXIのload()を呼び出すとthisがWindowオブジェクトに変わるため、注意
                console.log("setup:this=" + _);
                //Create the cat sprite
                var cat = new PIXI.Sprite(PIXI.loader.resources["img/ball.png"].texture);
                console.log("setup:this=" + _);
                //Add the cat to the stage
                _.app.stage.addChild(cat);
            };
            Game.prototype.update = function () {
            };
            return Game;
        }());
        jsMiniGames.Game = Game;
    })(jsMiniGames = snowman8765.jsMiniGames || (snowman8765.jsMiniGames = {}));
})(snowman8765 || (snowman8765 = {}));
