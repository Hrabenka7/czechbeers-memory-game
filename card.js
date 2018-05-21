function Card(imageValue, positionElement) {
    var self = this;
    self.value = imageValue;
    self.element = positionElement;


    // function which runs clickCallback function
    self.handleClick = function () {
        self.clickCallback()
    }

    // runnings function handleClick after clicking on card  
    self.element.addEventListener('click', self.handleClick);
}

Card.prototype.onClick = function (cb) {
    this.clickCallback = cb;
}

// function for flipping the Card
Card.prototype.flip = function () {
    var self = this;
    self.element.style.backgroundImage = "url(" + self.value + ")";   // after clicking on the card the styling will change.
}

// function for flipping the Card BACK 
Card.prototype.flipBack = function () {
    var self = this;
    self.element.style.backgroundImage = "url('images/blu.png')";  // going back to the Card back side
}