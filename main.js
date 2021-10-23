import Bubble from "./src/models/Bubble.js";

const bubblesContainer = document.getElementById('bubbles-container');
let generatedBubbles = generateBubbles();

bubblesContainer.addEventListener('click', createNewBubble, false);

window.onload = function() {
    main();
}

function main(){
    refreshBubblePosition(generatedBubbles);
}

function generateBubbles(){

    let bubbles = [];
    
    for(let i = 0; i < 10; i++){

        let xPosition = Math.floor(Math.random() * visualViewport.width);
        let yPosition = Math.floor(Math.random() * visualViewport.height);
        let width = Math.floor(Math.random() * (300-20) + 20);
        let speed = Math.random() * (1.2-0.2) + 0.2;
        let verticalDirection = Math.random() < 0.5;
        let horizontalDirection = Math.random() < 0.5;

        let newBubble = new Bubble(i, xPosition, yPosition, width, width, speed, verticalDirection, horizontalDirection, false, false);

        var newBubbleElement = document.createElement("div");
        newBubbleElement.setAttribute("class", "bubble");

        newBubbleElement.setAttribute("id", i);
        newBubbleElement.style.top = xPosition + "px";
        newBubbleElement.style.left = yPosition + "px";
        newBubbleElement.style.width = width + "px";
        newBubbleElement.style.height = width + "px";
        newBubbleElement.style.backgroundColor = getRandomColor();

        newBubbleElement.addEventListener("mouseover", onMouseOver, false);
        newBubbleElement.addEventListener("mouseleave", onMouseLeave, false);
        newBubbleElement.addEventListener("click", onBubbleClick, false);

        bubblesContainer.appendChild(newBubbleElement)
        
        bubbles.push(newBubble);
    }

    return bubbles;
}

function refreshBubblePosition(bubbles){
    
    setInterval(() => {
        for(var i=0; i < bubbles.length; i++){
            // Getting Position
            let yPos = bubbles[i].getYPosition();
            let xPos = bubbles[i].getXPosition();

            // Getting Bubble Size
            let size = bubbles[i].getWidth();

            // Getting Bubble speed
            let speed = bubbles[i].getSpeed();

            if(bubbles[i].getIsBeingCreated()){
                if(size != document.getElementById(bubbles[i].getId()).offsetWidth){
                    let currentSize = document.getElementById(bubbles[i].getId()).offsetWidth;
                    document.getElementById(bubbles[i].getId()).style.width = currentSize + 1 + "px";
                    document.getElementById(bubbles[i].getId()).style.height = currentSize + 1 + "px";
                } else {
                    bubbles[i].setIsBeingCreated(false);
                }
                continue;
            }

            if(bubbles[i].getIsHovered()){
                continue;
            }

            if(bubbles[i].getVerticalDirection()){
                if(yPos <= 0){
                    bubbles[i].setVerticalDirection(!bubbles[i].getVerticalDirection())
                }
                yPos -= speed;
            } else {
                if(yPos >= visualViewport.height || yPos + size >= visualViewport.height ){
                    bubbles[i].setVerticalDirection(!bubbles[i].getVerticalDirection())
                }
                yPos += speed;
            }

            if(bubbles[i].getHorizontalDirection()){
                if(xPos <= 0){
                    bubbles[i].setHorizontalDirection(!bubbles[i].getHorizontalDirection())
                }
                xPos -= speed;
            } else {
                if(xPos >= visualViewport.width || xPos + size >= visualViewport.width){
                    bubbles[i].setHorizontalDirection(!bubbles[i].getHorizontalDirection())
                }
                xPos += speed;
            }

            bubbles[i].setYPosition(yPos);
            bubbles[i].setXPosition(xPos);
            document.getElementById('bubbles-container').children[i].style.top = yPos + "px";
            document.getElementById('bubbles-container').children[i].style.left = xPos + "px";
        }
    }, 5)
}

function createNewBubble(event){

    let canCreateNewBubble = !generatedBubbles.some(bubble =>
        bubble.getIsHovered() === true
    );

    if(!canCreateNewBubble){
        return;
    }

    let id = generatedBubbles.length;
    let width = Math.floor(Math.random() * (300-20) + 20);
    let xPosition = event.pageX - (width /2);
    let yPosition = event.pageY - (width /2);
    let speed = Math.random() * (1.2-0.2) + 0.2;
    let verticalDirection = Math.random() < 0.5;
    let horizontalDirection = Math.random() < 0.5;

    let newBubble = new Bubble(
        id,
        xPosition, 
        yPosition, 
        width, 
        width, 
        speed, 
        verticalDirection, 
        horizontalDirection, 
        false, 
        true);

    var newBubbleElement = document.createElement("div");
    newBubbleElement.setAttribute("class", "bubble");

    newBubbleElement.setAttribute("id", newBubble.id);
    newBubbleElement.style.left = xPosition + "px";
    newBubbleElement.style.top = yPosition + "px";
    newBubbleElement.style.width = 0 + "px";
    newBubbleElement.style.height = 0 + "px";
    newBubbleElement.style.backgroundColor = getRandomColor();

    newBubbleElement.addEventListener("mouseover", onMouseOver, false);
    newBubbleElement.addEventListener("mouseleave", onMouseLeave, false);
    newBubbleElement.addEventListener("click", onBubbleClick, false);

    bubblesContainer.appendChild(newBubbleElement);

    generatedBubbles.push(newBubble);
}

function onMouseOver(event){
    generatedBubbles[event.target.id].setIsHovered(true);
    document.getElementById(event.target.id).style.zIndex = 1000;
}

function onMouseLeave(event){
    generatedBubbles[event.target.id].setIsHovered(false);
    document.getElementById(event.target.id).style.zIndex = 0;
}

function onBubbleClick(event){
    console.log("test");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}