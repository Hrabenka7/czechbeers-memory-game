'use strict'

function Game(parentElement) {                      //parent element = whatsOnScreenElement
    this.parentElement = parentElement;
    this.gameScreenElement = null;
    this.callbackEnd = null;
    this.blur = false;
    this.saturate = false
}

Game.prototype.onEnded = function (callback) {
    this.callbackEnd = callback;
}

// creating a game screen
Game.prototype.build = function () {
    var self = this;

    self.gameScreenElement = createHtml(` <div id = "gameScreen">
      <h1>BAC LEVEL: <span id="bac">0</span> ‰ &nbsp STATUS: <span id ="statusScreen"> SOBER </span></h1>
     
      
      <!-- The Modal -->
    <div id="nextLevel" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <h1>! LEVEL UP : <span id="status"></span> ! </h1>
            <span class="close" id="close" href="#">&times;</span>
            <img src="images/beer.gif" id="beer-gif">
            <p>Congratulations! <br> You have reached a new level of drunkiness!</p>
        </div>
    </div>

    <div class="container">
        <div class="row">
            
            <div class="col-3">
                <div class="card" id="card1"></div>
            </div>
            
            <div class="col-3">
              <div class="card" id="card2"></div>    
            </div>
            
            <div class="col-3">
                <div class="card" id="card3"></div>
            </div>

            <div class="col-3">
                <div class="card" id="card4"></div>
            </div>

        </div>
        <br>
        <div class="row">

            <div class="col-3">
                <div class="card" id="card5"></div>
            </div>

            <div class="col-3">
                <div class="card" id="card6" ></div>
            </div>

            <div class="col-3">
                <div class="card" id="card7" ></div>
            </div>

            <div class="col-3">
                <div class="card" id="card8"></div>
            </div>

        </div>
        <br>
        <div class="row">
        
            <div class="col-3">
                <div class="card" id="card9"></div>
            </div>
        
            <div class="col-3">
                <div class="card" id="card10"></div>
            </div>
        
            <div class="col-3">
                <div class="card" id="card11"></div>
            </div>

            <div class="col-3">
                <div class="card" id="card12"></div>
            </div>
        
        </div>

        </div>
    </div>`);

    self.parentElement.appendChild(self.gameScreenElement);
    self.buttonThing = document.querySelector('#close');
    self.buttonThing.addEventListener('click', function () {
        document.getElementById("nextLevel").style.display = "none";

        if (!self.blur){
            self.blur = true;
            document.getElementById("gameScreen").style.filter = "blur(2px)";
        } 
        else if (!self.saturate) {
            self.saturate = true;
            document.getElementById("gameScreen").style.filter = "saturate(10) blur(4px)";
        }

    })
}


Game.prototype.setup = function () {
    var self = this;
    var cardsElement = document.querySelectorAll('.card');  // array-like object of all card classes
    var cards = [...cardsElement];
    var openedCards = [];
    var lastArrayElement;
    var collectedPairs = [];
    var comparison = null;
    var alcoholLevel = 0; 
    var alcoholLevelDecimal = 0;
    var beerOpen = new Audio('sounds/beer-open.mp3');
    var flipBacksound = new Audio('sounds/flip.mp3'); 
    var levelUp = new Audio("sounds/level-up.mp3");

    
    // shuffle card's pictures
    function shuffleCards(array) {

        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    shuffleCards(cards); 

    // setting the images pictures    
    var IMAGES = ["images/plzen.jpg", "images/kozel.jpg", "images/staropramen.jpg", "images/zubr.png", "images/holba.jpg",
     "images/radegast.jpg"]

    function setupCards() {
        // assinging images and positions to card objects
        var imgIdx = 0;
        for (var i = 0; i < cards.length; i += 2) {
            var img = IMAGES[imgIdx];
            var newCardOne = new Card(img, cards[i]);
            var newCardTwo = new Card(img, cards[i + 1]);  // card-pairs

            newCardOne.onClick(cardOpen);
            newCardTwo.onClick(cardOpen);
            imgIdx++;
        }
    }

    setupCards();

    // comparing the values
    // @todo openedCards.lenght-1[value] cannot be clicked again!
    function cardOpen() {

        if (comparison === null) {
            openedCards.push(this);            // add opened Card to the array of openedCards
            this.flip();                      // flip(open) this selected Card
     /*        lastArrayElement = openedCards[openedCards.length - 1]
            document.getElementById(this.element.id).disabled = true; */

            if (openedCards.length === 2) {
                comparison = true;          // two cards are in the process of comparison 

                if (openedCards[0].value === openedCards[1].value) {
                    collectedPairs.push(openedCards[0], openedCards[1]);
                    openedCards = [];
                    comparison = null;     // the process of comparison is over
                    beerOpen.play();
                    alcoholLevel = alcoholLevel + 0.4;                                  
                    alcoholLevelDecimal = alcoholLevel.toFixed(1);                    
                    document.getElementById("bac").innerHTML = alcoholLevelDecimal;  

                    if (alcoholLevel === 0.8) {
                        document.getElementById("status").innerHTML = "TIPSY";  
                        document.getElementById("statusScreen").innerHTML = "TIPSY";
                        document.getElementById("nextLevel").style.display = "block";
                        levelUp.play();

                        // stop music when closing the modal
                        document.getElementById("close").onclick = function (evt) {
                            levelUp.pause();
                        };

                    }
                    
                    if (alcoholLevel === 1.6){
                        document.getElementById("status").innerHTML = "WASTED"; 
                        document.getElementById("statusScreen").innerHTML = "WASTED"; 
                        document.getElementById("nextLevel").style.display = "block";
                        levelUp.play();

                        // stop music when closing the modal
                        document.getElementById("close").onclick = function (evt) {
                            levelUp.pause();
                        };
                    }

                    if (collectedPairs.length === 12) {
                        self.callbackEnd();
                    }
                }
                else {
                    flipBacksound.play();
                    window.setTimeout(function () {
                        openedCards[0].flipBack();
                        openedCards[1].flipBack();
                        openedCards = [];
                        comparison = null;  // the process of comparison is over
                    }, 1000);

                }
            }
        };
    }
}

Game.prototype.destroy = function () {
    this.gameScreenElement.remove();
}

