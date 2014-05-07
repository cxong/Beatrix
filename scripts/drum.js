var ALPHA = 0.3;
var Drum = function(game, grid, sound) {
  //Sprite
  this.pos = g2p(grid);
  Phaser.Sprite.call(this, game, this.pos.x, this.pos.y, 'dot');
  this.alpha = ALPHA;
  this.sound = game.add.audio(sound);
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