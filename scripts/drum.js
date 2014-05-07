var Drum = function(game, grid, sound) {
  //Sprite
  this.pos = g2p(grid);
  Phaser.Sprite.call(this, game, this.pos.x, this.pos.y, 'dot');
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
    this.timeLast += MS_PER_BEAT;
  }
}