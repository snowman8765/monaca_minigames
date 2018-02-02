"use strict";

declare var Asset;

namespace snowman8765.jsMiniGames
{
  export class Game
  {
    private width = 800;
    private height = 600;
    
    private canvas:any = null;
    private ctx:any = null;
    private assets:Asset = null;
    
    public constructor(width:number, height:number, assets:Asset)
    {
      this.width = width;
      this.height = height;
      this.assets = assets;
    }
    
    public init():void
    {
      this.canvas = document.getElementById('maincanvas');
      this.ctx = this.canvas.getContext('2d');
    
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      
      this.assets.loadAssets(
        function() {
          // アセットがすべて読み込み終わったら、
          // ゲームの更新処理を始めるようにする
          window.requestAnimationFrame(this.update.bind(this));
        }.bind(this)
      );
    
      //window.requestAnimationFrame(this.update.bind(this));
    }

    private update():void
    {
      this.render();
      
      window.requestAnimationFrame(this.update.bind(this));
    }

    private render():void
    {
      // 全体をクリア
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      if(this.assets.images.length > 0)
      {
        // 背景を表示
        this.ctx.drawImage(this.assets.images['back'], 0, 0);
      
        // みかん箱を表示
        this.ctx.drawImage(this.assets.images['box'], 0, 0);
      }
    }
  }
}
