(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.background = this.add.sprite(x, y, 'background')
      this.background.anchor.setTo(0.5, 0.5);

      var text = "yoFish";
      var style = { font: "80px jungle", fill: "#ff0044" };
      var t = this.game.add.text(this.game.width/2, 50, text, style);
      t.anchor.setTo(0.5, 0.5);

      // this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Example Game' );
      // this.titleTxt.align = 'center';
      // this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      // y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, this.game.height/2, 'minecraftia', 'CLICK TO START');
      this.startTxt.anchor.setTo(0.5, 0.5);
      // this.startTxt.align = 'center';
      // this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['yofish'] = window['yofish'] || {};
  window['yofish'].Menu = Menu;

}());
