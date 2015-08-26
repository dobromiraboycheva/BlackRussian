var tile = function() {
    var LETTER_POINTS = {
        'à': 1,
        'á': 1,
        'â': 1,
        'ã': 1,
        'ä': 1,
        'å': 1,
        'æ': 1,
        'ç': 1,
        'è': 1,
        'é': 1,
        'ê': 1,
        'ë': 1,
        'ì': 1,
        'í': 1,
        'î': 1,
        'ï': 1,
        'ð': 1,
        'ñ': 1,
        'ò': 1,
        'ó': 1,
        'ô': 1,
        'õ': 1,
        'ö': 1,
        '÷': 1,
        'ø': 1,
        'ù': 1,
        'ú': 1,
        'ü': 1,
        'þ': 1,
        'ÿ': 1,
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