(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      this.game.input.maxPointers = 1;

      // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // this.game.scale.minWidth =  window.innerWidth;
      // this.game.scale.minHeight = window.innerHeight;
      // this.game.scale.maxWidth = window.innerWidth;
      // this.game.scale.maxHeight = window.innerHeight;
      // this.game.scale.forceOrientation(true);
      // this.game.scale.pageAlignHorizontally = true;
      // this.game.scale.setScreenSize(true);

      this.game.add.text(0, 0, "preload fix", {font:"1px jungle", fill:"#FFFFFF"});
      this.game.state.start('preloader');
    }
  };

  window['yofish'] = window['yofish'] || {};
  window['yofish'].Boot = Boot;

}());

