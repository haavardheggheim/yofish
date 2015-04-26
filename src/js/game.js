(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function() {
      this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'background');
      this.background.anchor.setTo(0.5, 0.5);

      this.score = 0;
      this.topScore = localStorage.getItem('topScore') === null ? 0 : localStorage.getItem('topScore');
      //var x = this.game.width / 2;

      this.game.stage.backgroundColor = '#acacac';

      this.scoreText = this.game.add.text(0, 10, '-', {
        font: 'bold 16px Arial',
        fill: '#ffffff'
      });

      this.updateScore();

      //this.player = this.add.sprite(x, 0, 'player');
      //this.player.anchor.setTo(1.0);
      //this.input.onDown.add(this.onInputDown, this);

      this.enemy = this.add.sprite(this.game.width, 0, 'fish');
      this.enemy.scale.x *= 0.25;
      this.enemy.scale.y *= 0.25;
      this.enemy.anchor.set(0.5, 0.5);

      //this.placePlayer();
      this.placeEnemy();
      this.game.input.onDown.add(function () {
        this.die();
      }, this);
    },

    update: function() {
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

    updateScore: function() {
      this.scoreText.text = 'Score: ' + this.score + ' - Best: ' + this.topScore;
    },

    placePlayer: function() {
      this.player.x = this.game.width / 2;
      this.player.y = this.game.height / 5 * 4;
      this.playerTween = this.game.add.tween(this.player).to({
        y: this.game.height
      }, 10000 - this.score * 10, 'Linear', true);
      this.playerTween.onComplete.add(this.die, this);
      this.game.input.onDown.add(this.fire, this);
    },

    placeEnemy: function() {
      this.pickRandomSide();
      this.pickRandomHeight();
      this.pickRandomTween();
    },

    pickRandomSide: function() {
      var random = this.game.rnd.integerInRange(0, 49);
      if (random >= 25) {
        this.enemy.x = this.game.width;
      } else {
        this.enemy.x = -this.enemy.width;
      }
    },

    pickRandomHeight: function() {
      var low = this.game.height - this.game.height / 4;
      var high = this.enemy.height;
      var random = this.game.rnd.integerInRange(low, high);
      this.enemy.y = random;
    },

    pickRandomTween: function() {
      var tweenType = this.getRandomEasing();
      if (this.enemy.x < 0) {
        this.moveEnemyRight(tweenType);
      } else {
        this.moveEnemyLeft(tweenType);
      }
    },

    getRandomEasing: function () {
      var easingTypes = [
        'Linear',
        'Quadratic',
        'Cubic',
        'Quartic',
        'Quintic',
        'Sinusoidal',
        'Exponential',
        'Circular',
        'Elastic'
      ];
      var easingType = easingTypes[this.game.rnd.integerInRange(0, easingTypes.length - 1)];
      var inOrOutTypes = [];
      for (var prop in Phaser.Easing[easingType]) {
        if (Phaser.Easing[easingType].hasOwnProperty(prop)) {
          inOrOutTypes.push(prop);
        }
      }
      var inOrOut = inOrOutTypes[this.game.rnd.integerInRange(0, inOrOutTypes.length - 1)];
      return Phaser.Easing[easingType][inOrOut];
    },

    moveEnemyLeft: function(easing) {
      //this.enemy.scale.x = 0.25;
      var tween = this.game.add.tween(this.enemy);
      tween.to({
        x: 0
      }, 1500, easing);
      tween.onComplete.add(function () {
        this.moveEnemyRight(easing);
      }, this);
      tween.start();
    },

    moveEnemyRight: function(easing) {
      //this.enemy.scale.x = -0.25;
      var tween = this.game.add.tween(this.enemy);
      tween.to({
        x: this.game.width
      }, 1500, easing);
      tween.onComplete.add(function () {
        this.moveEnemyLeft(easing);
      }, this);
      tween.start();
    },

    fire: function() {
      this.game.input.onDown.remove(this.fire, this);
      this.playerTween.stop();
      this.playerTween = this.game.add.tween(this.player).to({
        y: -this.player.width
      }, 500, 'Linear', true);
      this.playerTween.onComplete.add(this.die, this);
    }

  };

  window['yofish'] = window['yofish'] || {};
  window['yofish'].Game = Game;

}());