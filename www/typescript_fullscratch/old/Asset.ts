"use strict";

namespace snowman8765.jsMiniGames
{
  export class Asset
  {
    private defineList:AssetDefine[] = null; // アセットの定義
    private images:Image[] = null; // 読み込んだ画像
    
    public constructor(defineList:AssetDefine[])
    {
      this.defineList = defineList;
      this.images = {};
    }
    
    // アセットの読み込み
    public loadAssets(onComplete:()=>void):void
    {
      let total = this.defineList.length; // アセットの合計数
      let loadCount = 0; // 読み込み完了したアセット数
    
      // アセットが読み込み終わった時に呼ばれるコールバック関数
      let onLoad = function():void
      {
        loadCount++; // 読み込み完了数を1つ足す
        if (loadCount >= total) {
          // すべてのアセットの読み込みが終わった
          onComplete();
        }
      };
    
      // すべてのアセットを読み込む
      this.defineList.forEach(function(asset:AssetDefine)
      {
        switch (asset.type)
        {
          case 'image':
            this._loadImage(asset, onLoad);
            break;
        }
      }.bind(this));
    }

    // 画像の読み込み
    private _loadImage(asset:AssetDefine, onLoad:()=>void):void
    {
      let image:Image = new Image();
      image.src = asset.src;
      image.onload = onLoad;
      this.images[asset.name] = image;
    }
  }
  
  export interface AssetDefine {
      type: string;
      name: string;
      src: string;
  }
}
