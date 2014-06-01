var BasicGame = {};
BasicGame.Preload = function (game) {
    this.preloadBar = null;
};

BasicGame.Preload.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(PIXEL_SIZE * GRID_SIZE / 2,
                                          PIXEL_SIZE * GRID_SIZE / 2,
                                          'beat');
        this.preloadBar.width = PIXEL_SIZE;
        this.preloadBar.height = PIXEL_SIZE;
        this.load.setPreloadSprite(this.preloadBar);
        
        this.game.load.image('bg', 'images/bg.png');
        this.game.load.image('black', 'images/black.png');
        this.game.load.image('black2', 'images/black2.png');
        this.game.load.image('indicator', 'images/indicator.png');
        this.game.load.image('good', 'images/good.png');
        this.game.load.image('bad', 'images/bad.png');
      
        this.game.load.audio('yeah', 'audio/yeah.mp3');
        this.game.load.audio('mmhmm', 'audio/mmhmm.mp3');
        this.game.load.audio('rollover', 'audio/rollover.wav');
        this.game.load.audio('move', 'audio/move.mp3');
        this.game.load.audio('place', 'audio/place.mp3');
        
        // Add all the drum def assets
        for (var key in DrumDefs) {
          if (DrumDefs.hasOwnProperty(key)) {
            var drumdef= DrumDefs[key];
            // Sounds
            for (var i = 0; i < drumdef.length; i++) {
              this.game.load.audio(drumdef.name(i),
                                   drumdef.filenameAudio(i));
            }
            // Sprites
            this.game.load.image(drumdef.basename,
                                 drumdef.filenameImage());
          }
        }
    },

    create: function () {
        //this.preloadBar.cropEnabled = false;

        this.state.start('game');
    }
};
