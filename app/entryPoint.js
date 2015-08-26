// http://www.sitepoint.com/understanding-es6-modules/
import gameManager from 'app/gameEngine/gameManager.js';
import gameLogic from 'app/gameEngine/gameLogic.js';
import webUiProvider from 'app/uiProvider/webUiProvider.js';

(function() {
    console.log('entered');
    var PLAYERS_COUNT = 2;

    var newGameLogic = Object.create(gameLogic);
    var newUiProvider = Object.create(webUiProvider)
        .init();
    var newGameManager = Object.create(gameManager)
        .init(newUiProvider, newGameLogic, PLAYERS_COUNT);

    newGameManager.startGame();
}());