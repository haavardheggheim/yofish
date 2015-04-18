(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      
      this.loadResources();
    },
      
    loadResources: function () {
      this.load.image('background', 'assets/underwater.jpg');
      this.load.image('fish', 'assets/fish.png');

      this.load.image('player', 'assets/fishhook.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.image('enemy', 'assets/enemy.png');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['yofish'] = window['yofish'] || {};
  window['yofish'].Preloader = Preloader;

}());
