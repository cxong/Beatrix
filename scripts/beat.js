var Beat = function(game, parentDrum, vel, now) {
  this.grid = p2g(parentDrum);
  Phaser.Sprite.call(this,
                     game,
                     parentDrum.x, parentDrum.y,
                     'beat');
  this.vel = vel;
  this.alpha = 0.5;
  this.blendMode = PIXI.blendModes.LIGHTEN;
  this.timer = game.time;
  this.timeLast = now;
};
Beat.prototype = Object.create(Phaser.Sprite.prototype);
Beat.prototype.constructor = Beat;

Beat.prototype.update = function() {
  if (this.timer.elapsedSince(this.timeLast) > MS_PER_MINIBEAT) {
    this.grid.x += this.vel.x;
    this.grid.y += this.vel.y;
    if (this.grid.x < 0 || this.grid.y >= GRID_SIZE ||
        this.grid.y < 0 || this.grid.y >= GRID_SIZE) {
        // out of bounds kill
        this.kill();
    }
    while (this.timeLast + MS_PER_MINIBEAT < this.timer.now) {
      this.timeLast += MS_PER_MINIBEAT;
    }
    var pos = g2p(this.grid);
    this.x = pos.x;
    this.y = pos.y;
  }
};
