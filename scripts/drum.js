var ALPHA = 0.3;
var DrumDef = function(name, numbers) {
  this.name = name;
  this.numbers = numbers;
  this.filename = function(i) {
    return "audio/78-" + name + numbers[i] + ".mp3";
  };
  this.getRandomName = function() {
    return name + numbers[Math.floor(Math.random() * numbers.length)];
  };
}
var DrumDefs = {
  BD:  new DrumDef('BD',  [1, 2, 3]),           // bass drum
  BHI: new DrumDef('BHI', [1, 3]),              // bongos
  BLO: new DrumDef('BLO', [1, 3]),
  BME: new DrumDef('BME', [1, 2, 3]),
  CLA: new DrumDef('CLA', [1, 2]),              // claves
  COW: new DrumDef('COW', [1, 2]),              // cowbell
  GUI: new DrumDef('GUI', [1, 2, 3, 4, 5, 6]),  // guiro
  HH:  new DrumDef('HH',  [1, 2, 3, 4]),        // hihat
  HO:  new DrumDef('HO',  [1, 2, 3, 4]),        // ?
  ME:  new DrumDef('ME',  [1, 2, 3, 4]),        // "metal beat"
  RIM: new DrumDef('RIM', [1, 2, 3]),           // rimshot
  SD:  new DrumDef('SD',  [1, 2, 3, 4]),        // snare drum
  TAM: new DrumDef('TAM', [1, 2, 3])            // tambourine
};
var Drum = function(game, grid, drumdef) {
  //Sprite
  this.pos = g2p(grid);
  Phaser.Sprite.call(this, game, this.pos.x, this.pos.y, 'dot');
  this.alpha = ALPHA;
  this.sound = game.add.audio(drumdef.getRandomName());
  this.timer = game.time;
  this.timeLast = this.timer.now;
}

Drum.prototype = Object.create(Phaser.Sprite.prototype);
Drum.prototype.constructor = Drum;

Drum.prototype.update = function() {
  if (this.timer.elapsedSince(this.timeLast) >
      MS_PER_BEAT) {
    this.sound.play();
    while (this.timeLast + MS_PER_BEAT < this.timer.now) {
      this.timeLast += MS_PER_BEAT;
    }
  }
  var elapsedFrac =
    this.timer.elapsedSince(this.timeLast)/MS_PER_BEAT;
  this.alpha = 1 -
    Phaser.Easing.Cubic.Out(elapsedFrac)*(1 - ALPHA);
}
