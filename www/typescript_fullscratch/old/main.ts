"use strict";

// https://qiita.com/zukkun/items/2b811701b32836c52415

//import Asset = require('./Asset');
//import Game = require('./Game');

// アセットの定義
let AssetDefineList:AssetDefine[] = [
  { type: 'image', name: 'back', src: 'assets/back.png' },
  { type: 'image', name: 'box', src: 'assets/box.png' }
];

let asset = new snowman8765.jsMiniGames.Asset(AssetDefineList);
let game = new snowman8765.jsMiniGames.Game(800, 600, asset);

window.addEventListener('load', game.init.bind(game));
