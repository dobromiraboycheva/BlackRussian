var expect = require('chai').expect;

import logicProvider from 'app/gameEngine/gameLogic.js';
import player from 'app/gameObjects/player.js';
import Tile from 'app/gameObjects/tile.js';

describe('#gameLogic', function() {
    it('expect all tiles length to be 102', function () {
        var expectedLength = 102;
        var actual = logicProvider.getShuffledTilesPool();

        expect(actual).to.have.length(expectedLength);
    })

    it('expect player to have 10 tiles',function() {
        var player = Object.create(player).init('Paco');
        var tiles = logicProvider.getShuffledTilesPool();

        logicProvider.giveNewTilesToPlayer(player,tiles);

        expect(player.tiles).to.have.length(10);
    });

    it('expect players tiles to be instance of Tile',function() {
        var player = Object.create(player).init('Paco');
        var tiles = logicProvider.getShuffledTilesPool();

        logicProvider.giveNewTilesToPlayer(player,tiles);

        player.tiles.forEach(function (tile) {
            expect(tile).to.be.an.instanceof(Tile);
        });
    });

    it('expect player index to be correct', function () {
        var playerOne = Object.create(player).init('Gosho'),
            playerTwo = Object.create(player).init('Pesho');

        var currentPlayer = logicProvider.getNextPlayer(playerOne, [playerOne,playerTwo]);

        expect(currentPlayer).to.be.eql(playerTwo);
    });
});