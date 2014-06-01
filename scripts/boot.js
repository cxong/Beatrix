BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {
        this.game.load.image('beat', 'images/beat.png');
    },

    create: function () {
        this.game.stage.backgroundColor = 0x666699;
        this.input.maxPointers = 1;

        this.state.start('preload');
    }
};
