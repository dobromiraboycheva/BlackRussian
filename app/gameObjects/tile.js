var Tile = (function() {

    function init(letter, points) {
        this.letter = letter;
        this.points = points;
        return this;
    }    

    return {
        init
    }

}());

export default Tile;