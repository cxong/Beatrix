var ALPHA = 0.3;
var DrumDef = function(name, numbers) {
  this.length = numbers.length;
  this.basename = name;
  this.name = function(i) {
    return name + numbers[i];
  };
  this.randomName = function() {
    var i = Math.floor(Math.random() * numbers.length);
    return this.name(i);
  };
  this.filenameAudio = function(i) {
    return "audio/78-" + this.name(i) + ".mp3";
  };
  this.filenameImage = function() {
    return "images/" + name + ".png";
  };
};
var DrumDefs = {
  BD:  new DrumDef('BD',  [1, 2, 3]),           // bass drum
  BHI: new DrumDef('BHI', [1, 3]),              // bongos
  BLO: new DrumDef('BLO', [1, 3]),
  BME: new DrumDef('BME', [1, 2, 3]),
  CLA: new DrumDef('CLA', [1, 2]),              // claves
  COW: new DrumDef('COW', [1, 2]),              // cowbell
  GUI: new DrumDef('GUI', [1, 2, 3, 4, 5, 6]),  // guiro
  HH:  new DrumDef('HH',  [1, 2, 3, 4]),        // hihat
  HO:  new DrumDef('HO',  [1, 2, 3, 4]),        // hihat open
  ME:  new DrumDef('ME',  [1, 2, 3, 4]),        // "metal beat"
  RIM: new DrumDef('RIM', [1, 2, 3]),           // rimshot
  SD:  new DrumDef('SD',  [1, 2, 3, 4]),        // snare drum
  TAM: new DrumDef('TAM', [1, 2, 3])            // tambourine
};
var Drum = function(thegame, grid, drumdef, now, beatDirs) {
  //Sprite
  var pos = g2p(grid);
  Phaser.Sprite.call(this,
                     thegame.game,
                     pos.x, pos.y,
                     drumdef.basename);
  this.alpha = ALPHA;
  this.sound = thegame.game.add.audio(drumdef.randomName());
  this.timer = thegame.game.time;
  this.timeLast = now;
  this.beatDirs = beatDirs;
  this.heat = false;
  this.thegame = thegame;
  this.beatsLeft = 0;
  this.beatLast = now;
};
Drum.prototype = Object.create(Phaser.Sprite.prototype);
Drum.prototype.constructor = Drum;

Drum.prototype.update = function() {
  if (this.timer.elapsedSince(this.timeLast) > MS_PER_MINIBEAT) {
    while (this.timeLast + MS_PER_MINIBEAT < this.timer.now) {
      this.timeLast += MS_PER_MINIBEAT;
    }
    if (this.beatDirs !== undefined) {
      if (this.beatsLeft === 0) {
        this.hit = true;
        // Create beats
        for (var i = 0; i < this.beatDirs.length; i++) {
          this.thegame.beats.add(new Beat(this.thegame.game,
                                          this,
                                          this.beatDirs[i],
                                          this.timeLast));
        }
        this.beatsLeft = 16;
      }
      this.beatsLeft--;
    }
    if (this.hit) {
      this.sound.play();
      this.hit = false;
      this.beatLast = this.timeLast;
    }
  }
  var beatLen = MS_PER_MINIBEAT*4;
  if (this.beatLast + beatLen < this.timer.now) {
    this.alpha = ALPHA;
  } else {
    var efrac =
      this.timer.elapsedSince(this.beatLast)/beatLen;
    this.alpha = 1 - Phaser.Easing.Cubic.Out(efrac)*(1 - ALPHA);
  }
};
