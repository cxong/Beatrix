var Beat = function(game, parentDrum, vel, now) {
  var pos = parentDrum.pos;
  this.grid = p2g(pos);
  Phaser.Sprite.call(this,
                     game,
                     pos.x, pos.y,
                     'beat');
  this.vel = vel;
  this.timer = game.time;
  this.timeLast = now;
};
Beat.prototype = Object.create(Phaser.Sprite.prototype);
Beat.prototype.constructor = Beat;

var PX_PER_BEAT = 4; // travel 4px per beat
Beat.prototype.update = function() {
  var efrac = this.timer.elapsedSince(this.timeLast)/MS_PER_BEAT;
  efrac *= PX_PER_BEAT;
  var grid = {x:this.grid.x + this.vel.x*efrac,
              y:this.grid.y + this.vel.y*efrac};
  var gridWhole = {x:Math.floor(grid.x), y:Math.floor(grid.y)};
  var pos = g2p(gridWhole);
  this.x = pos.x;
  this.y = pos.y;
  if (this.timer.elapsedSince(this.timeLast) > MS_PER_BEAT) {
    this.grid.x += this.vel.x * PX_PER_BEAT;
    this.grid.y += this.vel.y * PX_PER_BEAT;
    if (this.grid.x < 0 || this.grid.y >= GRID_SIZE ||
        this.grid.y < 0 || this.grid.y >= GRID_SIZE) {
        // out of bounds kill
        this.kill();
    }
    while (this.timeLast + MS_PER_BEAT < this.timer.now) {
      this.timeLast += MS_PER_BEAT;
    }
  }
};
