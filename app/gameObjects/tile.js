var tile = function() {
    var LETTER_POINTS = {
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
        '�': 1,
    };

    function init(letter) {
        this.letter = letter;
        this.points = LETTER_POINTS[letter.toLowerCase()];
        return this;
    }

    return {
        init: init
    }
}();

export default tile;