var levels = [screenStart,
              level1_1, level1_2, level2_1,
              screenEasy,
              level2_2, level2_3, level2_4, level2_5,
              screenTricky,
              level3_1, level3_2, level3_3, level3_4,
              screenWin, screenCredits,
              levelbonus_1,
              screenEnd];

var GameState = function(game){};

GameState.prototype.preload = function() {
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
  this.solutionBg.removeAll(true);
  this.correctSolutionDrums.removeAll(true);
  this.solutionRows = 1;
  var i;
  for (i = 0; i < this.correctSolution.length; i++) {
    this.solutionRows = Math.max(this.solutionRows, this.correctSolution[i].length);
  }

  // Display background - big enough for solution plus one row
  var sRect = getSolutionRect(this.solutionRows,
                              this.correctSolution.length);
  var left = (GRID_SIZE - this.correctSolution.length) / 2;
  var bg = this.solutionBg.add(new Phaser.Sprite(this.game,
                                                 sRect.x, sRect.y,
                                                 'black'));
  bg.width = sRect.width;
  bg.height = sRect.height;
  // Add checkerboard to solution too
  // Create checkerboard background
  for (i = 0; i < this.correctSolution.length; i++) {
    for (var j = 0; j < this.solutionRows + 1; j++) {
      if (((i % 2) === 0) ^ ((j % 2) === 0)) {
        var pixel = g2p({
          x: left + i,
          y: GRID_SIZE - this.solutionRows - 1 + j});
        var check = this.solutionBg.add(
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
  this.solutionBg.removeAll(true);
  this.correctSolutionDrums.removeAll(true);
  this.solutionBeats.removeAll(true);
  this.solutionDrums.removeAll(true);
  this.beats.removeAll(true);
  this.drums.removeAll(true);
  this.indicators.removeAll(true);
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
  
  this.timeAccumMS = 0;
  this.bg = this.game.add.group();
  this.solutionBg = this.game.add.group();
  this.correctSolutionDrums = this.game.add.group();
  this.solutionBeats = this.game.add.group();
  this.solutionDrums = this.game.add.group();
  this.indicators = this.game.add.group();
  this.beats = this.game.add.group();
  this.drums = this.game.add.group();
  this.draggedDrum = null;
  this.solution = [];
  this.playAnyway = false;
  
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
  /*this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );*/
  
  this.levelIndex = 0;
  this.loadLevel(levels[this.levelIndex]);
};

GameState.prototype.dragAndInput = function() {
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
  // Mouse overs: drum or solution
  var mouseGrid = p2g(this.game.input);
  var drum = getDrumAt(this.drums, mouseGrid);
  // Can't drag drums that make beats
  var canDragDrum = drum !== null && drum.beatDirs === null;
  var sRect = getSolutionRect(this.solutionRows,
                              this.correctSolution.length);
  var isOverSolution =
    this.game.input.x >= sRect.x &&
    this.game.input.x < sRect.x + sRect.width &&
    this.game.input.y >= sRect.y &&
    this.game.input.y < sRect.y + sRect.height;
  if (canDragDrum || isOverSolution) {
    this.game.canvas.style.cursor = "pointer";
  } else {
    this.game.canvas.style.cursor = "default";
  }
  if (this.solutionBeats.length === 0) {
    if (this.game.input.activePointer.isDown) {
      // Check if this is a solution click; if so add beats
      if (isOverSolution &&
          this.solutionBeats.length === 0) {
        var dir = {x: 1, y: 0};
        for (i = 0; i < this.solutionRows; i++) {
          var pos = {
            x: sRect.x,
            y: (GRID_SIZE - this.solutionRows + i) * PIXEL_SIZE};
          this.solutionBeats.add(new Beat(this.game, pos, dir));
        }
        this.playAnyway = true;
      }
      
      this.rolloverDrum = null;
      mouseGrid = p2g(this.game.input);
      // Find the drum under the mouse
      if (this.draggedDrum === null) {
        if (canDragDrum) {
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
        drum.beatLast = 0;
      }
      this.rolloverDrum = drum;
    }
  }
};

GameState.prototype.moveTheBeat = function(beats, drums) {
  this.timeAccumMS += this.game.time.elapsedMS;
  if (this.timeAccumMS > msPerMinibeat(this.BPM)) {
    this.timeAccumMS = this.timeAccumMS % msPerMinibeat(this.BPM);
    if (this.solutionBeat === 0) {
      this.solutionDrums.removeAll(true);
    }
    var i;
    for (i = 0; i < beats.length; i++) {
      beats.getAt(i).updateBeat();
    }
    for (i = 0; i < drums.length; i++) {
      var drum = drums.getAt(i);
      drum.updateBeat();
    }

    return true;
  }
  return false;
};

GameState.prototype.moveBeatAndHitDrums = function(beats, drums) {
  if (this.moveTheBeat(beats, drums) || this.playAnyway) {
    var i;
    var drum;
    // Check collisions between beats and drums
    // Activate drums that collide with beats
    for (i = 0; i < drums.length; i++) {
      drum = drums.getAt(i);
      var drumGrid = p2g(drum);
      for (var j = 0; j < beats.length; j++) {
        var beat = beats.getAt(j);
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
    for (i = 0; i < drums.length; i++) {
      drum = drums.getAt(i);
      if (drum.hit) {
        drum.play(this.timeAccumMS);
      }
    }
    this.playAnyway = false;
    return true;
  }
  return false;
};

GameState.prototype.win = function() {
  this.game.canvas.style.cursor = "pointer";
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
        var sd = this.solutionDrums.add(new Phaser.Sprite(
          this.game, pixel.x, pixel.y, 'good'));
        sd.width = PIXEL_SIZE;
        sd.height = PIXEL_SIZE;
      }
    }
  }
};

GameState.prototype.update = function() {
  // Update FPS
  /*if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }*/
  
  if (!this.hasWon) {
    this.dragAndInput();

    // If we're listening to solution, update those beats only
    if (this.solutionBeats.length !== 0) {
      this.moveBeatAndHitDrums(this.solutionBeats,
                               this.correctSolutionDrums);
      // Special for solution:
      // destroy beats if they are outside solution area
      var sRect = getSolutionRect(this.solutionRows,
                                  this.correctSolution.length);
      if (this.solutionBeats.getAt(0).x >= sRect.x + sRect.width) {
        this.solutionBeats.removeAll(true);
      }
    } else {
      if (this.moveBeatAndHitDrums(this.beats, this.drums)) {
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
        var sd = this.solutionDrums.add(new Phaser.Sprite(
          this.game, pixel.x, pixel.y, isCorrect ? 'good' : 'bad'));
        sd.width = PIXEL_SIZE;
        sd.height = PIXEL_SIZE;
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
    }
  } else {
    // keep the beat
    this.moveBeatAndHitDrums(this.beats, this.drums);
    
    // Move to next level
    if (this.game.input.activePointer.justPressed()) {
      this.levelIndex++;
      console.log("Loading level " + this.levelIndex);
      this.loadLevel(levels[this.levelIndex]);
      this.sounds.newLevel.play('', 0, 0.3);
    }
  }
};
