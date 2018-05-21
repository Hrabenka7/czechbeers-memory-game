'use strict'

function main() {
    var screenContentElement = document.getElementById('screen-content');

    // --------------  START SCREEN ----------------- //

    var startScreenElement;
    var startButtonElement;

    function buildStartScreen() {
        startScreenElement = createHtml(` <div id = "startScreen-text">
        <h2><span class="czech">Czech</span><span class="beers">Beers</span><br>Memory Game</h2>
        <button id = "startScreen-button"><h3>LET'S DRINK</h3></button> 
    </div>`);

        screenContentElement.appendChild(startScreenElement);
        startButtonElement = startScreenElement.querySelector('button');
        startButtonElement.addEventListener('click', handleStartClick);
    }

    function handleStartClick() {
        destroyStartScreen();   // destroy start screen
        buildGameScreen();      // build the game screen
    }

    function destroyStartScreen() {
        startScreenElement.remove();
        startButtonElement.removeEventListener('click', handleStartClick);
    }


    // ----------------  GAME SCREEN ------------------ //

    var game;

    function buildGameScreen() {
        game = new Game(screenContentElement);
        game.build();
        game.setup();
        game.onEnded(gameEnded);
    }

    function gameEnded() {
        destroyGameScreen();
        buildGameOverScreen();
    }

    function destroyGameScreen() {
        game.destroy();
    }

    // ----------------- GAME OVER SCREEN ---------------- //

    var gameOverScreenElement;
    var restartGameButtonElement;
    var anthem = new Audio("sounds/anthem.mp3");


    function buildGameOverScreen() {
        gameOverScreenElement = createHtml(`<div class="gameOver-screen">
        
                <h1>GOOD JOB!</h1>  
                 <br>
                  <h2>You've got over 2.4‰ and haven't blacked out!</h2><br>
                  <h2> Do you want to try your luck again?</h2>
             <button id = "restartGame-button"><h3>GIMME ANOTHER ROUND</h3></button> <br>
                <img src="images/beerEnd.gif">
                
                 
             </div>
        </div>`);

        anthem.play();
        screenContentElement.appendChild(gameOverScreenElement);
        restartGameButtonElement = gameOverScreenElement.querySelector('button');
        restartGameButtonElement.addEventListener('click', handleRestartClick);

    }    

    function handleRestartClick() {
        anthem.pause();
        destroyGameOverScreen();
        buildGameScreen();
    }

    function destroyGameOverScreen() {
        gameOverScreenElement.remove();
        restartGameButtonElement.removeEventListener('click', handleRestartClick);
    }
    // -- start the app

    buildStartScreen();
   //buildGameOverScreen();
}

window.addEventListener('load', main);








