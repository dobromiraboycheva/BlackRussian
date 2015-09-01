var Player = function () {
    function init(name) {
        this.name = name;
        this.score = 0;
        this.tiles = [];
        return this;
    }

    return {
        init: init
    }
}();

export default Player;