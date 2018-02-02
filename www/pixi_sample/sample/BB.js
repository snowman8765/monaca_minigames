"use strict";
exports.__esModule = true;
var SETTINGS_GRAVITY = 0.07, SETTINGS_FPS = 30, SETTINGS_BALL_NUM = 1, SETTINGS_BOUND_X = 0.13, SETTINGS_BOUND_Y = 1.04, SETTINGS_ACCELEROMETER_RELOAD_FREQ = 100, SETTINGS_PADDLE_ACCEL = 2.8, SETTINGS_POINT = 1000, SETTINGS_POINT_SILVER = 200, SETTINGS_POINT_GOLD = 3000000;
var GAMESTATE_STOP = 0, GAMESTATE_PLAY = 1;
//var accelerationWatch = null;
var imgPath = {
    'ball': 'img/ball.png',
    'paddle': 'img/paddle.png',
    'block_red': 'img/block_red.png',
    'block_green': 'img/block_green.png',
    'block_blue': 'img/block_blue.png',
    'block_silver': 'img/block_silver.png',
    'block_gold': 'img/block_gold.png'
};
var BB = /** @class */ (function () {
    function BB() {
        this.stage = new PIXI.Stage(0x000000);
        this.renderer = null;
        this.screenSize = null;
        this.paddle = null;
        this.balls = [];
        this.blocks = [];
        this.score = 0;
        this.scoreLabel = null;
        this.accelLabel = null;
        this.isMouseDown = false;
        this.gameState = GAMESTATE_STOP;
    }
    // Create blocks map
    BB.prototype.setMap = function () {
        var blockMap = [
            [null, null, null, null, null, 'blue', null, null, null, null],
            [null, null, null, null, 'red', 'red', 'blue', null, null, null],
            [null, null, null, 'red', 'red', null, null, 'blue', null, null],
            [null, null, 'red', 'red', null, null, null, null, 'blue', null],
            [null, 'red', 'red', null, null, 'gold', null, null, 'silver', 'silver'],
            [null, null, 'red', 'red', null, null, null, 'silver', 'silver', null],
            [null, null, null, 'red', 'red', null, 'silver', 'silver', null, null],
            [null, null, null, null, 'silver', 'silver', 'silver', null, null, null],
            [null, null, null, null, null, 'silver', null, null, null, null]
        ];
        for (var j = 0; j < blockMap.length; j++) {
            for (var i = 0; i < blockMap[j].length; i++) {
                if (blockMap[j][i] !== null) {
                    var block = this.addBlock(10 + (30 * i), 80 + (12 * j), blockMap[j][i]);
                }
            }
        }
    };
    /**
     * @param {int} x
     * @param {int} y
     * @param {String} color red,blue,silver,gold
     * @return {Object} block
     **/
    BB.prototype.addBlock = function (x, y, color) {
        switch (color) {
            case "red":
            case "blue":
                var point = SETTINGS_POINT;
                break;
            case "silver":
                var point = SETTINGS_POINT_SILVER;
                break;
            case "gold":
                var point = SETTINGS_POINT_GOLD;
                break;
            default:
                var point = SETTINGS_POINT;
                color = "red";
                break;
        }
        var texture = PIXI.Texture.fromImage(imgPath["block_" + color], false);
        var block = new PIXI.Sprite(texture);
        block.anchor.x = 0.5;
        block.anchor.y = 0.5;
        block.position.x = x;
        block.position.y = y;
        block.width = 30;
        block.height = 12;
        block.point = point;
        this.stage.addChild(block);
        this.blocks.push(block);
        return block;
    };
    // Create a ball and add it to PIXI.Stage
    BB.prototype.addBall = function () {
        var texture = PIXI.Texture.fromImage(imgPath["ball"], false);
        var ball = new PIXI.Sprite(texture);
        ball.anchor.x = 0.5;
        ball.anchor.y = 0.5;
        ball.position.x = this.renderer.width * 0.5;
        ball.position.y = 200;
        ball.width = 10;
        ball.height = 10;
        ball.delta = {
            'x': Math.random() - 0.5,
            'y': -0.4
        };
        this.stage.addChild(ball);
        this.balls.push(ball);
    };
    // Create a paddle and add it to PIXI.Stage
    BB.prototype.addPaddle = function () {
        var texture = PIXI.Texture.fromImage(imgPath["paddle"], false);
        this.paddle = new PIXI.Sprite(texture);
        this.paddle.anchor.x = 0.5;
        this.paddle.anchor.y = 0.5;
        this.paddle.position.x = this.renderer.width * 0.5;
        this.paddle.position.y = this.renderer.height - 60;
        this.paddle.width = 60;
        this.paddle.height = 10;
        this.paddle.accel = 0;
        this.paddle.delta = {
            'x': Math.random() - 0.5,
            'y': -3.8
        };
        this.stage.addChild(this.paddle);
    };
    /**
     * Add points to current score
     * @param {int} val points to add
     */
    BB.prototype.addScore = function (val) {
        this.score += parseInt(val);
        this.scoreLabel.setText(this.score);
    };
    /**
     * Set score
     * @param {int} val new score
     */
    BB.prototype.setScore = function (val) {
        this.score = val;
        this.scoreLabel.setText(this.score);
    };
    /**
     * callback for PhoneGap Acceleration Watch
     * @param {Object} a a.x, a.y, a.z
     */
    BB.prototype.updateAcceleration = function (a) {
        var accelText = "", ac = a.x.toFixed(2);
        if (a.x > 0)
            accelText = '+' + String(ac);
        else
            accelText = String(ac);
        // Use parameter x to move paddle
        if (this.paddle !== null) {
            if (this.paddle.accel / ac > 2.0) {
            }
            else if (this.paddle.accel / ac > 0) {
                this.paddle.accel += ac * SETTINGS_PADDLE_ACCEL;
            }
            else {
                this.paddle.accel = ac * SETTINGS_PADDLE_ACCEL;
            }
        }
        this.accelLabel.setText(accelText);
    };
    // Reset current game and start new one
    BB.prototype.reset = function () {
        //Reset (remove all children in the stage if exists)
        for (var i_1 = this.stage.children.length - 1; i_1 >= 0; i_1--) {
            this.stage.removeChildAt(i_1);
        }
        this.balls = [];
        this.blocks = [];
        this.setMap();
        for (var i = 0; i < SETTINGS_BALL_NUM; i++) {
            this.addBall();
        }
        this.addPaddle();
        var resetLabel = new PIXI.Text("RESET", { font: "24px/1.2 vt", fill: "red" });
        resetLabel.position.x = 18;
        resetLabel.position.y = this.renderer.height - 52;
        this.stage.addChild(resetLabel);
        resetLabel.buttonMode = true;
        resetLabel.interactive = true;
        resetLabel.click = resetLabel.tap = function (data) {
            this.reset();
        };
        setTimeout(function () {
            resetLabel.setText("RESET"); //for Android
        }, 1000, resetLabel);
        var label = new PIXI.Text("SCORE:", { font: "24px/1.2 vt", fill: "red" });
        label.position.x = 20;
        label.position.y = 20;
        this.stage.addChild(label);
        setTimeout(function () {
            label.setText("SCORE:"); //for Android
        }, 1000, label);
        this.scoreLabel = new PIXI.Text("0", { font: "24px/1.2 vt", fill: "white" });
        this.scoreLabel.position.x = 90;
        this.scoreLabel.position.y = 20;
        this.stage.addChild(this.scoreLabel);
        this.setScore(0);
        /*
        var label = new PIXI.Text("ACCEL:", {font: "24px/1.2 vt", fill: "red"});
        label.position.x = 160;
        label.position.y = 20;
        BB.stage.addChild(label);
        label.setText("ACCEL:"); //for Android
        
        BB.accelLabel = new PIXI.Text("0", {font: "24px/1.2 vt", fill: "white"});
        BB.accelLabel.position.x = 230;
        BB.accelLabel.position.y = 20;
        BB.stage.addChild(BB.accelLabel);
        */
        this.gameState = GAMESTATE_PLAY;
    };
    /**
     * Check whether the ball hits the object
     * @param {PIXI.Sprite} ball
     * @param {PIXI.Sprite} obj target object
     */
    BB.prototype.isBallHit = function (ball, obj) {
        return (ball.position.x > (obj.position.x - (obj.width * 0.5))) &&
            (ball.position.x < (obj.position.x + (obj.width * 0.5))) &&
            (ball.position.y > (obj.position.y - (obj.height * 0.5))) &&
            (ball.position.y < (obj.position.y + (obj.height * 0.5)));
    };
    // Game Over        
    BB.prototype.endGame = function () {
        this.gameState = GAMESTATE_STOP;
        vibrate(500);
    };
    // Game Clear
    BB.prototype.clearGame = function () {
        if (typeof navigator.notification !== 'undefined') {
            navigator.notification.alert("Cleared!", function () { }, "Congraturations");
        }
        else {
            alert("Cleared!");
        }
        this.gameState = GAMESTATE_STOP;
    };
    BB.prototype.init = function () {
        // Accelerometer
        /*
        if (typeof navigator.accelerometer !== 'undefined' && !accelerationWatch) {
            accelerationWatch = navigator.accelerometer.watchAcceleration(
                BB.updateAcceleration,
                function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                },
                {frequency: SETTINGS_ACCELEROMETER_RELOAD_FREQ}
            );
        }
        */
        var BB = this;
        BB.screenSize = setBound();
        BB.renderer = (getUa() === "Android") ? new PIXI.CanvasRenderer(BB.screenSize.width, BB.screenSize.height) : new PIXI.autoDetectRenderer(BB.screenSize.width, BB.screenSize.height),
            BB.renderer.transparent = false;
        document.body.appendChild(BB.renderer.view);
        setScale(BB.screenSize);
        BB.reset();
        // Event listeners to control the paddle
        window.addEventListener("touchmove", function (e) {
            BB.paddle.position.x = e.touches[0].clientX / BB.screenSize.zoom;
        });
        window.addEventListener("mousedown", function (e) {
            BB.isMouseDown = true;
        });
        window.addEventListener("mouseup", function (e) {
            BB.isMouseDown = false;
        });
        window.addEventListener("mousemove", function (e) {
            if (BB.isMouseDown)
                BB.paddle.position.x = e.clientX;
        });
        window.addEventListener("keydown", function (e) {
            switch (e.which) {
                case 37:
                    BB.paddle.position.x -= 4;
                    BB.paddle.accel += (SETTINGS_PADDLE_ACCEL * 0.1);
                    break;
                case 39:
                    BB.paddle.position.x += 4;
                    BB.paddle.accel -= (SETTINGS_PADDLE_ACCEL * 0.1);
                    break;
                case 38:
                    BB.paddle.position.y -= 1;
                    break;
            }
        });
        window.requestAnimationFrame(this.animate);
    };
    // Render callback
    BB.prototype.animate = function () {
        var BB = this;
        if (BB.gameState === GAMESTATE_PLAY) {
            //Move the paddle
            BB.paddle.position.x -= BB.paddle.accel;
            if (BB.paddle.position.x - (BB.paddle.width * 0.5) < 0) {
                BB.paddle.position.x = BB.paddle.width * 0.5;
                BB.paddle.accel = 0;
            }
            else if (BB.paddle.position.x + (BB.paddle.width * 0.5) > BB.renderer.width) {
                BB.paddle.position.x = BB.renderer.width - (BB.paddle.width * 0.5);
                BB.paddle.accel = 0;
            }
            //Move balls
            for (var i = BB.balls.length - 1; i >= 0; i--) {
                var ball = BB.balls[i];
                ball.position.x += ball.delta.x;
                if ((ball.position.x > BB.renderer.width) || (ball.position.x < 0)) {
                    ball.delta.x *= -1;
                }
                ball.delta.y += SETTINGS_GRAVITY;
                ball.y += ball.delta.y;
                if (ball.y < 0) {
                    ball.y = 0;
                    ball.delta.y *= -1;
                }
                else if (ball.y > BB.renderer.height + 40) {
                    BB.stage.removeChild(ball);
                    BB.balls.splice(i, 1);
                    if (BB.balls.length <= 0) {
                        BB.endGame();
                    }
                    continue;
                }
                // Ball&Paddle hit detection
                if (BB.isBallHit(ball, BB.paddle)) {
                    ball.delta.x += -1 * SETTINGS_BOUND_X * (BB.paddle.position.x - ball.position.x);
                    ball.delta.y *= -1 * SETTINGS_BOUND_Y;
                }
                //Ball&blocks hit detection
                for (var j = BB.blocks.length - 1; j >= 0; j--) {
                    var block = BB.blocks[j];
                    if (BB.isBallHit(ball, block)) {
                        BB.addScore(block.point);
                        ball.delta.y *= -1;
                        if ((ball.position.x < 4 + block.position.x - (block.width * 0.5)) || (ball.position.x > -4 + block.position.x + (block.width * 0.5))) {
                            ball.delta.x *= -1; //ball hits side of the block
                        }
                        BB.stage.removeChild(block);
                        BB.blocks.splice(j, 1);
                        if (BB.blocks.length <= 0) {
                            BB.clearGame();
                        }
                    }
                }
            }
        }
        window.requestAnimationFrame(this.animate);
        BB.renderer.render(BB.stage);
    };
    return BB;
}());
exports.BB = BB;
function setScale(bound) {
    switch (getUa()) {
        case "Android":
        case "iPad":
        case "iPhone":
            document.getElementsByTagName("canvas")[0].style["-webkit-transform"] = "scale(" + bound.zoom + "," + bound.zoom + ")";
            break;
        default:
            break;
    }
    return bound;
}
function setBound() {
    var bound = {
        width: 320,
        height: 460,
        zoom: 1
    };
    switch (getUa()) {
        case "Android":
        case "iPad":
        case "iPhone":
            bound.height = screen.availHeight * (bound.width / screen.availWidth);
            bound.zoom = screen.availWidth / bound.width;
            break;
        default:
            bound.height = window.innerHeight;
            break;
    }
    return bound;
}
function vibrate(duration) {
    if (typeof duration === 'undefined')
        duration = 500;
    if (typeof navigator.notification !== 'undefined')
        navigator.notification.vibrate(duration);
}
function getUa() {
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0) {
        return 'iPhone';
    }
    else if (navigator.userAgent.indexOf('iPad') > 0) {
        return 'iPad';
    }
    else if (navigator.userAgent.indexOf('Android') > 0) {
        return 'Android';
    }
    else
        return false;
}
