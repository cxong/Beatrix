var GameState = function(game){};

GameState.prototype.preload = function() {
  this.game.load.image('dot', 'dot.png');
  
  this.game.load.audio('bd1', 'audio/78-BD1.mp3');
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = 0x4488cc;
  
  this.game.add.existing(
      this.player = new Drum(this.game, {x:15, y:25}, 'bd1')
  );
  
  // FPS timer
  // Turn off in prod
  this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );
}

GameState.prototype.update = function() {
  // Update FPS
  if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }
}

var game = new Phaser.Game(GRID_SIZE*PIXEL_SIZE, GRID_SIZE*PIXEL_SIZE, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);