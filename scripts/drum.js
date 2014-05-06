var Drum = function(game, x, y, target) {
  //Sprite
  Phaser.Sprite.call(this, game, x, y, 'dot');
  this.target = target;
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  
  // TODO remove
  //We need a target position for our player to head to
  this.targetPos = {x:this.x, y:this.y};
  //And an easing constant to smooth the movement
  this.easer = .5;
  //Health
  this.health = 100;
}

Drum.prototype = Object.create(Phaser.Sprite.prototype);
Drum.prototype.constructor = Drum;

Drum.prototype.update = function() {

  // TODO remove movement stuff
  
  //If the target's (which we have assigned as this.game.input) active pointer is down
  if (this.target.activePointer.isDown) {
    //Make our new target position the pointers position
    this.targetPos = {x:this.target.x, y:this.target.y};
  }

  //Now work out the velocities by working out the difference between the target and the current position, and use an easer to smooth it.
  var velX = (this.targetPos.x-this.x)/this.easer;
  var velY = (this.targetPos.y-this.y)/this.easer;

  //Set the Players physics body's velocity
  this.body.velocity.setTo(velX, velY);

}