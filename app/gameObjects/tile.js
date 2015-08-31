var tile = function() {
    var allTiles = [],
        LETTER_POINTS = {
        '0': {'blank':2},
        '1': {'a':9, 'e':8, 'i':8, 'n':4, 'o':9,'p':4, 'r':4, 's':4,'t':5},
        '2': {'b':3,'v':4,'d':4,'k':3,'l':3,'m':4},
        '3': {'g':3, 'aa':2},
        '4': {'j':2,'z':2},
        '5': {'ikaratko':1,'u':3,'h':1,'ch':2,'q':2},
        '8': {'c':1,'sh':1,'iu':1},
        '10': {'f':1,'sht':1,'ermaluk':1}
    };

    function getAllTiles() {
        for (var points in LETTER_POINTS) {

            for (var letter in LETTER_POINTS[points]) {
                //console.log(letter + ' ' + LETTER_POINTS[points][letter]);

                for (var count = 0; count < LETTER_POINTS[points][letter]; count++) {
                    allTiles.push({ letter: letter, points: points });
                }
            }
        }

        return allTiles;
    }

    return {
        getAllTiles: getAllTiles
    }
}();

export default tile;
