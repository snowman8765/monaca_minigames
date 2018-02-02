
// http://www.pixijs.com/tutorials
// https://qiita.com/standard-software/items/82cfad075decd42aba92
// http://tech.leihauoli.com/post/2014/11/10/program-design-1.html

declare var PIXI;

//import Card from './object/Card';

namespace snowman8765.jsMiniGames {
  export class Game
  {
    private app:any = null;
    
    public constructor(width:number, height:number)
    {
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
    
    public init():void
    {
      console.log("init:this=" + this);
      //Add the canvas that Pixi automatically created for you to the HTML document
      document.body.appendChild(this.app.view);
      
      //load an image and run the `setup` function when it's done
      PIXI.loader
        .add("img/ball.png")
        .load(this.setup);
        
      console.log("init:this.setup=" + this.setup);
    }
    
    public setup():void
    {
      let _ = miniGame; // PIXIのload()を呼び出すとthisがWindowオブジェクトに変わるため、注意
      console.log("setup:this=" + _);
      //Create the cat sprite
      let cat = new PIXI.Sprite(PIXI.loader.resources["img/ball.png"].texture);
      
      console.log("setup:this=" + _);
      //Add the cat to the stage
      _.app.stage.addChild(cat);
    }
    
    public update():void
    {
      
    }
  }
}
