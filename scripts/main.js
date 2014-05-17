var GameState = function(game){};

GameState.prototype.preload = function() {
  this.game.load.image('beat', 'images/beat.png');
  
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
  
  var now = this.game.time.now;
  this.beats = this.game.add.group();
  this.drums = this.game.add.group();
  this.drums.add(
    new Drum(this, {x:15, y:25}, DrumDefs.BD, now,
             [{x:0, y:-1}, {x:1, y:0}])
  );
  this.drums.add(new Drum(this, {x:1, y:1}, DrumDefs.BD, now));
  this.drums.add(new Drum(this, {x:1, y:2}, DrumDefs.BD, now));
  this.drums.add(new Drum(this, {x:10, y:20}, DrumDefs.CLA, now));
  this.drums.add(new Drum(this, {x:13, y:9}, DrumDefs.SD, now));
  this.drums.add(new Drum(this, {x:11, y:9}, DrumDefs.SD, now));
  this.drums.add(new Drum(this, {x:1, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:2, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:3, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:4, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:5, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:6, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:7, y:4}, DrumDefs.HH, now));
  this.drums.add(new Drum(this, {x:8, y:4}, DrumDefs.HH, now));
  this.draggedDrum = null;
  
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
  
  // Check input: drag drums around
  var getDrumAt = function(drums, grid) {
    for (var i = 0; i < drums.length; i++) {
      var drum = drums.getAt(i);
      var drumGrid = p2g(drum);
      if (drumGrid.x == grid.x &&
          drumGrid.y == grid.y) {
        return drum;
      }
    }
    return null;
  };
  if (this.game.input.activePointer.isDown) {
    var mouseGrid = p2g(this.game.input);
    // Find the drum under the mouse
    if (this.draggedDrum === null) {
      this.draggedDrum = getDrumAt(this.drums, mouseGrid);
    }
    if (this.draggedDrum) {
      // Move drum around
      if (getDrumAt(this.drums, mouseGrid) === null) {
        var pixel = g2p(mouseGrid);
        this.draggedDrum.x = pixel.x;
        this.draggedDrum.y = pixel.y;
      }
    }
  } else {
    this.draggedDrum = null;
  }
  
  // Check collisions between beats and drums
  // Activate drums that collide with beats
  for (var i = 0; i < this.drums.length; i++) {
    var drum = this.drums.getAt(i);
    var drumGrid = p2g(drum);
    for (var j = 0; j < this.beats.length; j++) {
      var beat = this.beats.getAt(j);
      var beatGrid = p2g(beat);
      if (drumGrid.x == beatGrid.x && drumGrid.y == beatGrid.y) {
        drum.hit = true;
        break;
      }
    }
  }
};

var game = new Phaser.Game(GRID_SIZE*PIXEL_SIZE, GRID_SIZE*PIXEL_SIZE, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
