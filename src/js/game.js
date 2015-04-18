(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.score = 0 

      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.stage.backgroundColor = '#acacac';

      this.scoreText = this.game.add.text(0,10,"-",{
        font:"bold 16px Arial",
        fill: "#ffffff"
      });
      
      this.updateScore();

      this.player = this.add.sprite(x, this.game.height/5*4, 'player');
      this.player.anchor.setTo(0.5);
      //this.input.onDown.add(this.onInputDown, this);

      this.enemy = this.add.sprite(this.game.width, 0, 'enemy');
      this.enemy.anchor.set(0.5);

      this.placePlayer();
      this.placeEnemy();
    },

    update: function () {
      // var x, y, cx, cy, dx, dy, angle, scale;

      // x = this.input.position.x;
      // y = this.input.position.y;
      // cx = this.world.centerX;
      // cy = this.world.centerY;

      // angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      // this.player.angle = angle;

      // dx = x - cx;
      // dy = y - cy;
      // scale = Math.sqrt(dx * dx + dy * dy) / 100;

      // this.player.scale.x = scale * 0.6;
      // this.player.scale.y = scale * 0.6;

      if(Phaser.Math.distance(this.player.x, this.player.y, this.enemy.x, this.enemy.y)<this.player.width/2+this.enemy.width/2) {
        //tweenstop
        this.score++;
        console.log(Math.abs(this.player.x-this.enemy.x))
        if(Math.abs(this.player.x-this.enemy.x)<10) {
          this.score += 2;
        }
        this.placePlayer();
        this.placeEnemy();
        this.updateScore();
      }
    },

    /*onInputDown: function () {
      this.game.state.start('menu');
    },*/

    die: function() {
      this.game.state.start('game');
    },

    updateScore: function () {
      this.scoreText.text = "Score: " + this.score;
    },

    placePlayer: function() {
      this.player.x = this.game.width/2;
      this.player.y = this.game.height/5*4;
      this.playerTween = this.game.add.tween(this.player).to({
        y:this.game.height
      },10000-this.score*10,"Linear",true);
      this.playerTween.onComplete.add(this.die,this);
      this.game.input.onDown.add(this.fire, this);
  },

    placeEnemy: function() {
      this.enemy.x = this.game.width-this.enemy.width/2;
      this.enemy.y = -this.enemy.width/2;
      var enemyEnterTween = this.game.add.tween(this.enemy).to({
        y: this.game.rnd.between(this.enemy.width*2,this.game.height/4*3-this.player.width/2)  
      },200,"Linear",true);
      enemyEnterTween.onComplete.add(this.moveEnemy, this);
    },

    moveEnemy: function() {
      this.enemyTween = this.game.add.tween(this.enemy).to({
        x: this.enemy.width/2
      },500+this.game.rnd.between(0,2500), Phaser.Easing.Cubic.InOut, true);
      this.enemyTween.yoyo(true, 0);
      this.enemyTween.repeat(50, 0);
    },

    fire: function() {
      this.game.input.onDown.remove(this.fire, this);
      this.playerTween.stop();
      this.playerTween = this.game.add.tween(this.player).to({
        y:-this.player.width
      },500,"Linear",true);
      this.playerTween.onComplete.add(this.die,this);
    }

  };

  window['yofish'] = window['yofish'] || {};
  window['yofish'].Game = Game;

}());
