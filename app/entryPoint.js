// http://www.sitepoint.com/understanding-es6-modules/
(function() {
    import gameManager from 'app/gameEngine/gameManager.js';
    import gameLogic from 'app/gameEngine/gameLogic.js';
    import webUiProvider from 'app/uiProvider/webUiProvider.js';

    var PLAYERS_COUNT = 2;

    var newGameLogic = Object.create(gameLogic);
    var newUiProvider = Object.create(webUiProvider);
    var newGameManager = Object.create(gameManager)
        .init(newUiProvider, newGameLogic, PLAYERS_COUNT);

    newGameManager.startGame();
}());