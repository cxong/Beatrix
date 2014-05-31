var levels = [level0,
              level1_1, level1_2,
              level2_1, level2_2, level2_3, level2_4, level2_5,
              level3_1, level3_2, level3_3, level3_4];

var GameState = function(game){};

GameState.prototype.preload = function() {
  this.game.load.image('beat', 'images/beat.png');
  this.game.load.image('bg', 'images/bg.png');
  this.game.load.image('black', 'images/black.png');
  this.game.load.image('black2', 'images/black2.png');
  this.game.load.image('good', 'images/good.png');
  this.game.load.image('bad', 'images/bad.png');

  this.game.load.audio('yeah', 'audio/yeah.mp3');
  this.game.load.audio('mmhmm', 'audio/mmhmm.mp3');
  this.game.load.audio('rollover', 'audio/rollover.wav');
  this.game.load.audio('move', 'audio/move.mp3');
  this.game.load.audio('place', 'audio/place.mp3');
  
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

function loadSolution(level) {
  var solution = [];
  if (level.solution !== undefined) {
    var i;
    for (i = 0; i < level.solution[0].length; i++) {
      solution.push([]);
    }
    for (var row = 0; row < level.solution.length; row++) {
      for (i = 0; i < level.solution[row].length; i++) {
        var ch = level.solution[row].charAt(i);
        if (ch !== " ") {
          solution[i].push(level[ch].drum);
        }
      }
    }
  }
  return solution;
}

GameState.prototype.addSolutionDrums = function(level) {
  this.correctSolutionDrums.removeAll(true);
  this.solutionRows = 1;
  var i;
  for (i = 0; i < this.correctSolution.length; i++) {
    this.solutionRows = Math.max(this.solutionRows, this.correctSolution[i].length);
  }

  // Display background - big enough for solution plus one row
  var left = (GRID_SIZE - this.correctSolution.length) / 2;
  var pixel = g2p({x:left, y:GRID_SIZE - this.solutionRows - 1});
  var bg = this.correctSolutionDrums.add(new Phaser.Sprite(this.game,
                                                           pixel.x, pixel.y,
                                                           'black'));
  bg.width = this.correctSolution.length * PIXEL_SIZE;
  bg.height = (this.solutionRows + 1) * PIXEL_SIZE;
  // Add checkerboard to solution too
  // Create checkerboard background
  for (i = 0; i < this.correctSolution.length; i++) {
    for (var j = 0; j < this.solutionRows + 1; j++) {
      if (((i % 2) === 0) ^ ((j % 2) === 0)) {
        pixel = g2p({
          x: left + i,
          y: GRID_SIZE - this.solutionRows - 1 + j});
        var check = this.correctSolutionDrums.add(
          new Phaser.Sprite(this.game,
                            pixel.x, pixel.y,
                            'black2'));
        check.width = PIXEL_SIZE;
        check.height = PIXEL_SIZE;
      }
    }
  }
  if (level.solution !== undefined) {
    for (var row = 0; row < level.solution.length; row++) {
      var y = GRID_SIZE - this.solutionRows + row;
      for (i = 0; i < level.solution[row].length; i++) {
        var x = left + i;
        var ch = level.solution[row].charAt(i);
        if (ch !== " ") {
          this.correctSolutionDrums.add(new Drum(this,
                                                 {x:x, y:y}, level[ch].drum,
                                                 null, null, null));
        }
      }
    }
  }
};

GameState.prototype.loadLevel = function(level) {
  // Reset everything
  this.correctSolutionDrums.removeAll(true);
  this.solutionDrums.removeAll(true);
  this.beats.removeAll(true);
  this.drums.removeAll(true);
  this.draggedDrum = null;
  this.solution = [];
  this.correctSolution = [[]];
  this.solutionRows = 1;
  this.solutionBeat = 0;
  this.BPM = 120;
  
  // Load solution
  if (level.solution !== undefined) {
    this.correctSolution = loadSolution(level);
  }
  // Add pseudo-drums to display the solution
  this.addSolutionDrums(level);
  // Load the level
  for (var y = 0; y < GRID_SIZE; y++) {
    var row = level.cells[y];
    for (var x = 0; x < GRID_SIZE; x++) {
      var ch = row.charAt(x);
      if (ch !== " ") {
        var drumdef = level[ch].drum;
        var bounce = null;
        if (level[ch].bounce !== undefined) {
          bounce = dir2vel(level[ch].bounce);
        }
        var beats = null;
        if (level[ch].beat !== undefined) {
          beats = [];
          for (var i = 0; i < level[ch].beat.length; i++) {
            var dir = level[ch].beat[i];
            beats.push(dir2vel(dir));
          }
        }
        this.drums.add(new Drum(this,
                                {x:x, y:y}, drumdef,
                                bounce, beats, level[ch].period));
      }
    }
  }
  this.solutionBeat = 0;
  this.hasWon = false;
  this.alwaysWin = level.alwaysWin;
  if (level.BPM !== undefined) {
    this.BPM = level.BPM;
  }
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = 0x333333;
  
  this.sounds = {
    win: this.game.add.audio("yeah"),
    newLevel: this.game.add.audio("mmhmm"),
    rollover: this.game.add.audio("rollover"),
    move: this.game.add.audio("move"),
    place: this.game.add.audio("place")
  };
  
  this.timeLast = this.game.time.now;
  this.bg = this.game.add.group();
  this.correctSolutionDrums = this.game.add.group();
  this.solutionDrums = this.game.add.group();
  this.beats = this.game.add.group();
  this.drums = this.game.add.group();
  this.draggedDrum = null;
  this.solution = [];
  
  // Create checkerboard background
  for (var i = 0; i < GRID_SIZE; i++) {
    for (var j = 0; j < GRID_SIZE; j++) {
      if (((i % 2) === 0) ^ ((j % 2) === 0)) {
        var pixel = g2p({x: i, y: j});
        var check = this.bg.add(new Phaser.Sprite(this.game,
                                                  pixel.x, pixel.y,
                                                  'bg'));
        check.width = PIXEL_SIZE;
        check.height = PIXEL_SIZE;
      }
    }
  }
  
  // FPS timer
  // Turn off in prod
  this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );
  
  this.levelIndex = 0;
  this.loadLevel(levels[this.levelIndex]);
};

GameState.prototype.dragDrumAround = function() {
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
  var drum;
  var mouseGrid;
  if (this.game.input.activePointer.isDown) {
    this.rolloverDrum = null;
    mouseGrid = p2g(this.game.input);
    // Find the drum under the mouse
    if (this.draggedDrum === null) {
      drum = getDrumAt(this.drums, mouseGrid);
      // Can't drag drums that make beats
      if (drum !== null && drum.beatDirs === null) {
        this.draggedDrum = drum;
        this.sounds.move.play();
      }
    }
    if (this.draggedDrum) {
      // Move drum around
      if (getDrumAt(this.drums, mouseGrid) === null) {
        var pixel = g2p(mouseGrid);
        if (this.draggedDrum.x !== pixel.x || this.draggedDrum.y !== pixel.y) {
          this.sounds.rollover.play();
        }
        this.draggedDrum.x = pixel.x;
        this.draggedDrum.y = pixel.y;
      }
    }
  } else {
    if (this.draggedDrum !== null) {
      this.sounds.place.play();
    }
    this.draggedDrum = null;
    mouseGrid = p2g(this.game.input);
    // play rollover sound if mouse over a drum
    drum = getDrumAt(this.drums, mouseGrid);
    // Can't drag drums that make beats
    if (drum !== null && drum.beatDirs === null && drum !== this.rolloverDrum) {
      this.sounds.rollover.play();
      drum.beatLast = this.game.time.now;
    }
    this.rolloverDrum = drum;
  }
};

GameState.prototype.moveTheBeat = function() {
  if (this.game.time.elapsedSince(this.timeLast) > msPerMinibeat(this.BPM)) {
    while (this.timeLast + msPerMinibeat(this.BPM) < this.game.time.now) {
      this.timeLast += msPerMinibeat(this.BPM);
    }
    if (this.solutionBeat === 0) {
      this.solutionDrums.removeAll(true);
    }
    var i;
    for (i = 0; i < this.beats.length; i++) {
      this.beats.getAt(i).updateBeat();
    }
    for (i = 0; i < this.drums.length; i++) {
      var drum = this.drums.getAt(i);
      drum.updateBeat();
    }

    return true;
  }
  return false;
};

GameState.prototype.moveBeatAndHitDrums = function() {
  if (this.moveTheBeat()) {
    var i;
    var drum;
    // Check collisions between beats and drums
    // Activate drums that collide with beats
    for (i = 0; i < this.drums.length; i++) {
      drum = this.drums.getAt(i);
      var drumGrid = p2g(drum);
      for (var j = 0; j < this.beats.length; j++) {
        var beat = this.beats.getAt(j);
        var beatGrid = p2g(beat);
        if (drumGrid.x == beatGrid.x && drumGrid.y == beatGrid.y) {
          drum.hit = true;
          // Check if this is a bouncy drum
          // Change the beat direction
          if (drum.bounceDir !== null) {
            beat.vel = drum.bounceDir;
          }
          break;
        }
      }
    }
    
    // Hit drums that have been hit with beats, or beat themselves
    for (i = 0; i < this.drums.length; i++) {
      drum = this.drums.getAt(i);
      if (drum.hit) {
        drum.play(this.timeLast);
      }
    }
    return true;
  }
  return false;
};

GameState.prototype.win = function() {
  this.sounds.win.play('', 0, 0.3);
  this.hasWon = true;
  // Add win squares all around
  var solutionXMin = Math.floor((GRID_SIZE - this.correctSolution.length) / 2);
  var solutionXMax = solutionXMin + this.correctSolution.length;
  for (var x = 0; x < GRID_SIZE; x++) {
    for (var y = 0; y < GRID_SIZE; y++) {
      if (x === 0 || y === 0 || x === GRID_SIZE - 1 ||
          (y === GRID_SIZE - 1 && (x < solutionXMin || x >= solutionXMax))) {  
        var pixel = g2p({x:x, y:y});
        this.solutionDrums.add(new Phaser.Sprite(this.game,
                                                 pixel.x, pixel.y,
                                                 'good'));
      }
    }
  }
};

GameState.prototype.update = function() {
  // Update FPS
  if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }
  
  if (!this.hasWon) {
    this.dragDrumAround();
    
    if (this.moveBeatAndHitDrums()) {
      var i;
      var j;
      // Check solution too
      var beats = [];
      for (i = 0; i < this.drums.length; i++) {
        drum = this.drums.getAt(i);
        if (drum.hit) {
          beats.push(drum.name);
        }
      }
      
      // Add the drums beaten this beat
      this.solution.push(beats);
      // Check our solution so far
      var ourBeats = this.solution[this.solutionBeat].sort();
      var correctBeats = [];
      var isCorrect = true;
      for (j = 0; j < this.correctSolution[this.solutionBeat].length; j++) {
        correctBeats.push(this.correctSolution[this.solutionBeat][j].basename);
      }
      correctBeats = correctBeats.sort();
      if (ourBeats.length != correctBeats.length) {
        isCorrect = false;
      } else {
        for (j = 0; j < correctBeats.length; j++) {
          if (ourBeats[j] != correctBeats[j]) {
            isCorrect = false;
          }
        }
      }
      // Add a sprite showing whether these beats are correct
      var x = (GRID_SIZE - this.correctSolution.length) / 2 + this.solutionBeat;
      var y = GRID_SIZE - this.solutionRows - 1;
      var pixel = g2p({x:x, y:y});
      this.solutionDrums.add(new Phaser.Sprite(this.game,
                                               pixel.x, pixel.y,
                                               isCorrect ? 'good' : 'bad'));
      if (!isCorrect) {
        this.isCorrect = false;
      }
      this.solutionBeat++;
      if (this.solutionBeat == this.correctSolution.length) {
        if (this.alwaysWin) {
          this.isCorrect = true;
        }
        if (this.isCorrect && !this.hasWon) {
          this.win();
        } else {
          this.solution = [];
          this.isCorrect = true;
          this.solutionBeat = 0;
        }
      }
    }
  } else {
    // keep the beat
    this.moveBeatAndHitDrums();
    
    // Move to next level
    if (this.game.input.activePointer.justPressed()) {
      this.levelIndex++;
      this.loadLevel(levels[this.levelIndex]);
      this.sounds.newLevel.play('', 0, 0.3);
    }
  }
};

var game = new Phaser.Game(GRID_SIZE*PIXEL_SIZE, GRID_SIZE*PIXEL_SIZE, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
