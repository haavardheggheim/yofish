(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.growing = true;
  }

  Game.prototype = {

    create: function () {
      this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'background')
      this.background.anchor.setTo(0.5, 0.5);

      var x = this.game.width / 2,
          y = this.game.height - this.game.height / 4;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);


      this.fish = this.add.sprite(this.game.width, this.game.height / 2, 'fish')
      this.fish.anchor.setTo(0.5, 0.5);
      var tween = this.game.add.tween(this.fish);
      tween.to({ x: -this.fish.width }, 1500, Phaser.Easing.Linear.None);
      tween.start();

      tween.onComplete.add(function () {
        console.log('complete');
        this.fish.scale.x *= -1;
        var tween = this.game.add.tween(this.fish);
        tween.to({ x: this.game.width + this.fish.width }, 1500, Phaser.Easing.Linear.None);
        tween.start();
      }.bind(this));

      this.input.onDown.add(this.onInputDown, this);
      this.game.stage.backgroundColor = 0xffffff;
    },

    update: function () {
      // var x, y, cx, cy, dx, dy, angle, scale;
      // x = this.input.position.x;
      // y = this.input.position.y;
      // cx = this.world.centerX;
      // cy = this.world.centerY;

      // angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      // this.fish.angle += 6;
      var scaleFactor = 1.02;
      // if (this.growing) {
      //   this.player.scale.x *= scaleFactor;
      //   this.player.scale.y *= scaleFactor;
      //   if (this.player.scale.x > 1) {
      //     this.growing = false
      //   };
      // } else {
      //   this.player.scale.x /= scaleFactor;
      //   this.player.scale.y /= scaleFactor;
      //   if (this.player.scale.x < 0.2) {
      //     this.growing = true
      //   };
      // }
    },

    onInputDown: function () {
      var tween = this.game.add.tween(this.player);
      tween.to({ y: 0 }, 1000, Phaser.Easing.Linear.None);
      // tween.to({ x: this.game.width }, 2000, Phaser.Easing.Linear.None);
      // tween.loop();
      tween.start()
    }

  };

  window['yofish'] = window['yofish'] || {};
  window['yofish'].Game = Game;

}());
