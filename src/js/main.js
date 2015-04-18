window.onload = function () {
  'use strict';

  var game
    , ns = window['yofish'];

  var playerTween;
  var enemyTween;
  var score = 0;
  var scoreText;
  var topScore;

  game = new Phaser.Game(320, 480, Phaser.AUTO, 'yofish-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');
};
