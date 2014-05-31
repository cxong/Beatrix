var Beat = function(game, parentDrum, vel) {
  this.grid = p2g(parentDrum);
  Phaser.Sprite.call(this,
                     game,
                     parentDrum.x, parentDrum.y,
                     'beat');
  this.width = PIXEL_SIZE;
  this.height = PIXEL_SIZE;
  this.vel = vel;
  this.alpha = 0.5;
  this.blendMode = PIXI.blendModes.LIGHTEN;
};
Beat.prototype = Object.create(Phaser.Sprite.prototype);
Beat.prototype.constructor = Beat;

Beat.prototype.updateBeat = function() {
  this.grid.x += this.vel.x;
  this.grid.y += this.vel.y;
  if (this.grid.x < 0 || this.grid.y >= GRID_SIZE ||
      this.grid.y < 0 || this.grid.y >= GRID_SIZE) {
      // out of bounds kill
      this.kill();
  }
  var pos = g2p(this.grid);
  this.x = pos.x;
  this.y = pos.y;
};
