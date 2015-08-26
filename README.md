# BlackRussian
Teamwork repo for JS APPS course at Telerik Academy 2015

Здравей Тодор, разглеждах кода, който си написал и е много добре структуран. Забелязах някой неща докато разбера логиката, които сигурно сам щеше да намериш, но да се включа и аз с нещо:

В тази функция в gameLogic.js:
function giveNewTilesToPlayer(player, tilesPool) {
        while (player.tiles < 10 || tilesPool.length === 0) {
            player.tiles.push(tilesPool.pop());
        }
    }
    
tilesPool e всъщност торбата с останалите букви в играта, и ако е така мисля, че в цикъла условието трябва да бъде:
 while (player.tiles.length < 10 && tilesPool.length !== 0)
 
 В тази функиция в същия файл:
 function getNextPlayer(currentPlayer, players) {
        var currentPlayerIndex;
        players.forEach(function (player, index) {
            if (currentPlayer = player) {
                currentPlayerIndex = index;
            }
        });
        
В if-a за проверката кой е следващият плайер си пропуснал още едно равно да сложиш.

П.С. Съжелявам че тук пиша, но съм на работа и нямам скупе и фацебоок.
