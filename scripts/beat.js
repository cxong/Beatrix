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
  this.active = false;  // don't hit the parent drum
};
Beat.prototype = Object.create(Phaser.Sprite.prototype);
Beat.prototype.constructor = Beat;

Beat.prototype.update = function() {
  var efrac =
    this.timer.elapsedSince(this.timeLast)/MS_PER_MINIBEAT;
  var grid = {x:this.grid.x + this.vel.x*efrac,
              y:this.grid.y + this.vel.y*efrac};
  var gridWhole = {x:Math.floor(grid.x), y:Math.floor(grid.y)};
  var pos = g2p(gridWhole);
  this.x = pos.x;
  this.y = pos.y;
  if (this.timer.elapsedSince(this.timeLast) > MS_PER_MINIBEAT) {
    this.grid.x += this.vel.x;
    this.grid.y += this.vel.y;
    this.active = true;
    if (this.grid.x < 0 || this.grid.y >= GRID_SIZE ||
        this.grid.y < 0 || this.grid.y >= GRID_SIZE) {
        // out of bounds kill
        this.kill();
    }
    while (this.timeLast + MS_PER_MINIBEAT < this.timer.now) {
      this.timeLast += MS_PER_MINIBEAT;
    }
  }
};
