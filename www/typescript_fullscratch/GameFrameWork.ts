"use strict";

namespace snowman8765.jsMiniGames
{
  export class GameFrameWork
  {
    private width:number;
    private height:number;
    
    private canvas:any;
    private ctx:any;
    private assets:AssetLoader;
    
    public constructor(assets:AssetLoader)
    {
      this.assets = assets;
    
      let bound:any = setBound();
      this.width = bound.width;
      this.height = bound.height;
    }
    
    public init = () =>
    {
      this.canvas = document.getElementById('maincanvas');
      this.ctx = this.canvas.getContext('2d');
      
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      
      this.assets.loadAssets(() =>
        {
          // アセットがすべて読み込み終わったら、
          // ゲームの更新処理を始めるようにする
          //window.requestAnimationFrame(this.update);
        }
      );
    
      window.requestAnimationFrame(this.update);
    }

    private update = () =>
    {
      this.render();
      
      window.requestAnimationFrame(this.update);
    }

    private render = () =>
    {
      // 全体をクリア
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // 背景を表示
      this.ctx.drawImage(this.assets.images.back, 0, 0);
    
      // みかん箱を表示
      this.ctx.drawImage(this.assets.images.box, 0, 0);
    }
  }
}
