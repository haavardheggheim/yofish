(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'background')
      this.background.anchor.setTo(0.5, 0.5);



      this.score = 0 
      this.topScore = localStorage.getItem('topScore')==null?0:localStorage.getItem('topScore');
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.stage.backgroundColor = '#acacac';

      this.scoreText = this.game.add.text(0,10,"-",{
        font:"bold 16px Arial",
        fill: "#ffffff"
      });
      
      this.updateScore();

      this.player = this.add.sprite(x, 0, 'player');
      this.player.anchor.setTo(1.0);
      //this.input.onDown.add(this.onInputDown, this);

      this.enemy = this.add.sprite(this.game.width, 0, 'fish');
      this.enemy.scale.x *= 0.25;
      this.enemy.scale.y *= 0.25;
      this.enemy.anchor.set(0.5, 0.5);

      this.placePlayer();
      this.placeEnemy();
    },

    update: function () {
      // if(Phaser.Math.distance(this.player.x, this.player.y, this.enemy.x, this.enemy.y)<this.player.width/2+this.enemy.width/2) {
      //   // this.enemyTween.stop();
      //   this.playerTween.stop();
      //   this.score++;
      //   console.log(Math.abs(this.player.x-this.enemy.x))
      //   if(Math.abs(this.player.x-this.enemy.x)<10) {
      //     this.score += 2;
      //   }
      //   this.placePlayer();
      //   this.placeEnemy();
      //   this.updateScore();
      // }
    },

    /*onInputDown: function () {
      this.game.state.start('menu');
    },*/

    die: function() {
      localStorage.setItem('topScore', Math.max(this.score, this.topScore));
      this.game.state.start('game');
    },

    updateScore: function () {
      this.scoreText.text = "Score: " + this.score + " - Best: " + this.topScore;
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
      this.enemy.x = this.game.width;
      this.enemy.y = -this.enemy.width/2;
      var enemyEnterTween = this.game.add.tween(this.enemy).to({
        y: this.game.rnd.between(this.enemy.width*2,this.game.height/4*3-this.player.width/2)  
      },200,"Linear",true);
      enemyEnterTween.onComplete.add(this.moveEnemyLeft, this);
    },

    moveEnemyLeft: function() {
      this.enemy.scale.x = 0.25;
      var tween = this.game.add.tween(this.enemy);
      tween.to({ x: 0 }, 1500, Phaser.Easing.Linear.None);
      tween.onComplete.add(this.moveEnemyRight, this);
      tween.start();
    },

    moveEnemyRight: function () {
      this.enemy.scale.x = -0.25
      var tween = this.game.add.tween(this.enemy);
      tween.to({ x: this.game.width }, 1500, Phaser.Easing.Linear.None);
      tween.onComplete.add(this.moveEnemyLeft, this);
      tween.start();
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
