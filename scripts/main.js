var GameState = function(game){};

GameState.prototype.preload = function() {
  this.game.load.image('dot', 'dot.png');
  
  // Add all the drum def assets
  for (var key in DrumDefs) {
    if (DrumDefs.hasOwnProperty(key)) {
      var drumdef= DrumDefs[key];
      // Sounds
      for (var i = 0; i < drumdef.length; i++) {
        this.game.load.audio(drumdef.name(i),
                             drumdef.filenameAudio(i));
      }
      // Sprites
      this.game.load.image(drumdef.basename,
                           drumdef.filenameImage());
    }
  }
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = 0x333333;
  
  this.game.add.existing(
      this.player = new Drum(this.game, {x:15, y:25}, DrumDefs.BD)
  );
  this.game.add.existing(
    new Drum(this.game, {x:10, y:20}, DrumDefs.CLA)
  );
  
  // FPS timer
  // Turn off in prod
  this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );
};

GameState.prototype.update = function() {
  // Update FPS
  if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }
};

var game = new Phaser.Game(GRID_SIZE*PIXEL_SIZE, GRID_SIZE*PIXEL_SIZE, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
