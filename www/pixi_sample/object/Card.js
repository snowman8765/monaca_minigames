var snowman8765;
(function (snowman8765) {
    var jsMiniGames;
    (function (jsMiniGames) {
        var CardDisplay;
        (function (CardDisplay) {
            CardDisplay[CardDisplay["BACK"] = 0] = "BACK";
            CardDisplay[CardDisplay["FRONT"] = 1] = "FRONT";
        })(CardDisplay = jsMiniGames.CardDisplay || (jsMiniGames.CardDisplay = {}));
        var Card = /** @class */ (function () {
            // コンストラクタ
            function Card(ww, hh) {
                this.dispW = ww;
                this.dispH = hh;
                this.isOpen = false;
            }
            // カード初期化
            Card.prototype.init = function (img, img2, px, py, w, h) {
                this.obj[CardDisplay.FRONT] = img;
                this.obj[CardDisplay.BACK] = img2;
                this.px = px;
                this.py = py;
                this.w = w;
                this.h = h;
                this.objsState = CardDisplay.BACK;
            };
            // カードに数字と種類の要素代入
            Card.prototype.setCardEl = function (suu, syu) {
                this.suuji = suu;
                this.syurui = syu;
            };
            // カード表示
            Card.prototype.draw = function (c, p) {
                if (this.isOpen == true) {
                    this.rect = new Rect(this.px, this.py, this.px + this.w, this.py + this.h);
                    this.obj[this.objsState].setBounds(this.rect);
                    this.obj[this.objsState].draw(c);
                }
            };
            // 短形初期化
            Card.prototype.initRect = function (px, py, w, h, col, al) {
                this.px = px;
                this.py = py;
                this.w = w;
                this.h = h;
                this.col = col;
                this.alpha = al;
                this.rect = new Rect((px), (py), (px + w), (py + h));
            };
            // 短形表示
            Card.prototype.drawRect = function (c, p) {
                p.setColor(this.col);
                p.setAlpha(this.alpha);
                c.drawRect(this.rect, p);
            };
            // カード座標代入
            Card.prototype.setRect = function (rect1) {
                this.px = rect1.left;
                this.py = rect1.top;
                this.w = rect1.right;
                this.h = rect1.bottom;
            };
            Card.prototype.isOpened = function () { return this.isOpen; };
            Card.prototype.displayFront = function () { this.isOpen = true; };
            Card.prototype.displayBack = function () { this.isOpen = false; };
            Card.prototype.getSuuji = function () { return this.suuji; };
            Card.prototype.setObjState = function (o) { this.objsState = o; };
            Card.prototype.getRect = function () { return this.rect; };
            // テスト用
            Card.prototype.drawString = function (str, x, y, size, col, c, p) {
                p.setColor(col);
                p.setTextSize(size);
                c.drawText(str, x, y, p);
            };
            // どのスマホの機種でもうまく表示出来るように、座標変換
            Card.prototype.setgetDrawableSize = function () {
                var dw = this.dispW / 854.0;
                var dh = this.dispH / 480.0;
                this.px *= dw;
                this.py *= dh;
                this.w *= dw;
                this.h *= dh;
            };
            return Card;
        }());
        jsMiniGames.Card = Card;
        /*
        class Rect
        {
            private x: number;
            private y: number;
            private width: number;
            private height: number;
    
            public constructor(x:number, y:number, w:number, h:number)
            {
                this.x = x;
                this.y = y;
                this.width = w;
                this.height = h;
            }
        }
        */
    })(jsMiniGames = snowman8765.jsMiniGames || (snowman8765.jsMiniGames = {}));
})(snowman8765 || (snowman8765 = {}));
