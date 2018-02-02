declare var Rect;

namespace snowman8765.jsMiniGames {
    export enum CardDisplay
    {
        BACK = 0,
        FRONT = 1
    }
  
  export class Card
  {
    private dispW:number;
    private dispH:number;// ディスプレイ大きさ
  
    public px:number;
    public py:number; // オブジェクト座標
    
  	private w:number;
    private h:number; // オブジェクトの横幅縦幅
  	private rect:any; // オブジェクトのRect
  	private alpha:number; // オブジェクトの透過度
  	private objsState:CardDisplay;// カード表示裏か表か
  	private col:number;// オブジェクトカラー
  	private obj:any[2];// カード画像、表、裏
  	private suuji:number;
    private syurui:number;// カード数字と種類
  	private isOpen:boolean;// カードを表示させるかどうか
  
  	// コンストラクタ
  	public constructor(ww:number, hh:number)
    {
        this.dispW = ww;
        this.dispH = hh;
        this.isOpen = false;
  	}
  
  	// カード初期化
  	public init(img:any, img2:any, px:number, py:number, w:number, h:number):void
    {
  		this.obj[CardDisplay.FRONT] = img;
  		this.obj[CardDisplay.BACK] = img2;
  		this.px = px;
  		this.py = py;
  		this.w = w;
  		this.h = h;
  		this.objsState = CardDisplay.BACK;
  	}
  
  	// カードに数字と種類の要素代入
  	public setCardEl(suu:number, syu:number):void
    {
  		this.suuji = suu;
  		this.syurui = syu;
  	}
  
  	// カード表示
  	public draw(c:any, p:any):void
    {
  		if (this.isOpen == true) {
  			this.rect = new Rect(this.px, this.py, this.px + this.w, this.py + this.h);
  			this.obj[this.objsState].setBounds(this.rect);
  			this.obj[this.objsState].draw(c);
  		}
  	}
  
  	// 短形初期化
  	private initRect(px:number, py:number, w:number, h:number, col:number, al:number):void
    {
  		this.px = px;
  		this.py = py;
  		this.w = w;
  		this.h = h;
  		this.col = col;
  		this.alpha = al;
  		this.rect = new Rect((px), (py), (px + w), (py + h));
  	}
  
  	// 短形表示
  	private drawRect(c:any, p:any):void
    {
  		p.setColor(this.col);
  		p.setAlpha(this.alpha);
  		c.drawRect(this.rect, p);
  	}
  
  	// カード座標代入
  	public setRect(rect1:any):void
    {
  		this.px = rect1.left;
  		this.py = rect1.top;
  		this.w = rect1.right;
  		this.h = rect1.bottom;
  	}
  
  	public isOpened():boolean { return this.isOpen; }
  
  	public displayFront():void { this.isOpen = true; }
  
    public displayBack():void { this.isOpen = false; }
  
  	public getSuuji():number { return this.suuji; }
  
  	public setObjState(o:number):void { this.objsState = o; }
  
  	public getRect():any { return this.rect; }
  
  	// テスト用
  	private drawString(str:string, x:number, y:number, size:number, col:number, c:any, p:any):void
    {
  		p.setColor(col);
  		p.setTextSize(size);
  		c.drawText(str, x, y, p);
  	}
  
  	// どのスマホの機種でもうまく表示出来るように、座標変換
  	private setgetDrawableSize():void
    {
  		let dw:number = this.dispW / 854.0;
  		let dh:number = this.dispH / 480.0;
  
  		this.px *= dw;
  		this.py *= dh;
  		this.w *= dw;
  		this.h *= dh;
  	}
    }
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
}