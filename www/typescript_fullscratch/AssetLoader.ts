"use strict";

declare var AssetDefine;

namespace snowman8765.jsMiniGames
{
  export class AssetLoader
  {
    private defineList:AssetDefine[] = null; // アセットの定義
    private images:Image[] = null; // 読み込んだ画像
    
    public constructor(defineList:AssetDefine[])
    {
      this.defineList = defineList;
      this.images = {};
    }
    
    // アセットの読み込み
    public loadAssets = (onComplete:()=>void) =>
    {
      let total:number = this.defineList.length; // アセットの合計数
      let loadCount:number = 0; // 読み込み完了したアセット数
    
      // アセットが読み込み終わった時に呼ばれるコールバック関数
      let onLoad = () =>
      {
        loadCount++; // 読み込み完了数を1つ足す
        if (loadCount >= total) {
          // すべてのアセットの読み込みが終わった
          onComplete();
        }
      };
    
      // すべてのアセットを読み込む
      this.defineList.forEach((asset:AssetDefine) =>
      {
        if (asset.type == 'image')
        {
          this._loadImage(asset, onLoad);
        }
      });
    }

    // 画像の読み込み
    private _loadImage = (asset:AssetDefine, onLoad:()=>void) =>
    {
      let image:Image = new Image();
      image.src = asset.src;
      image.onload = onLoad;
      this.images[asset.name] = image;
    }
  }
}
