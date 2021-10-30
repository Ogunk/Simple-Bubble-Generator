import Bubble from "./src/models/Bubble.js";

// CONST
const bubblesContainer = document.getElementById('bubbles-container');
const BUBBLE_MAX_SIZE = 300;
const BUBBLE_MIN_SIZE = 20;
const BUBBLE_MAX_SPEED = 1.2;
const BUBBLE_MIN_SPEED = 0.2;

// Variables
let mainTimeout;
let generatedBubbles = generateBubbles();
let bubbleDeletedEvent = false;

// Addin Event listener
bubblesContainer.addEventListener('click', createNewBubble, false);

window.onload = function() {
    main();
}

function main(){
    bubbleDeletedEvent = false;
    refreshBubblePosition(generatedBubbles);
}

function generateBubbles(){

    let bubbles = [];
    
    for(let i = 0; i < 10; i++){

        let xPosition = Math.floor(Math.random() * visualViewport.width);
        let yPosition = Math.floor(Math.random() * visualViewport.height);
        let width = Math.floor(Math.random() * (BUBBLE_MAX_SIZE-BUBBLE_MIN_SIZE) + BUBBLE_MIN_SIZE);
        let speed = Math.random() * (BUBBLE_MAX_SPEED - BUBBLE_MIN_SPEED) + BUBBLE_MIN_SPEED;
        let verticalDirection = Math.random() < 0.5;
        let horizontalDirection = Math.random() < 0.5;

        let newBubble = new Bubble(i, xPosition, yPosition, width, width, speed, verticalDirection, horizontalDirection, false, false);

        var newBubbleElement = document.createElement("div");
        newBubbleElement.setAttribute("class", "bubble");

        newBubbleElement.setAttribute("id", newBubble.id);
        newBubbleElement.style.top = xPosition + "px";
        newBubbleElement.style.left = yPosition + "px";
        newBubbleElement.style.width = width + "px";
        newBubbleElement.style.height = width + "px";
        newBubbleElement.style.backgroundColor = getRandomColor();

        newBubbleElement.addEventListener("mouseover", onMouseOver, false);
        newBubbleElement.addEventListener("mouseleave", onMouseLeave, false);
        newBubbleElement.addEventListener("click", onBubbleClick, false);

        bubblesContainer.appendChild(newBubbleElement);
        
        bubbles.push(newBubble);
    }

    return bubbles;
}

function refreshBubblePosition(bubbles){
    
    mainTimeout = setInterval(() => {
        bubbles.some(bubble => {

            if(bubbleDeletedEvent){
                 return true;
            }

            // If bubble is hovered skip it
            if(bubble.getIsHovered() ){
                return;
            }

            // Getting Position
            let yPos = bubble.getYPosition();
            let xPos = bubble.getXPosition();

            // Getting Bubble Size
            let size = bubble.getWidth();

            // Getting Bubble speed
            let speed = bubble.getSpeed();

            if(bubble.getIsBeingCreated()){
                document.getElementById(bubble.id).style.zIndex = 1000;
                if(size != document.getElementById(bubble.getId()).offsetWidth){
                    let currentSize = document.getElementById(bubble.getId()).offsetWidth;
                    document.getElementById(bubble.getId()).style.width = currentSize + 1 + "px";
                    document.getElementById(bubble.getId()).style.height = currentSize + 1 + "px";
                } else {
                    document.getElementById(bubble.id).style.zIndex = 0;
                    bubble.setIsBeingCreated(false);
                }
                return;
            }

            if(bubble.getVerticalDirection()){
                if(yPos <= 0){
                    bubble.setVerticalDirection(!bubble.getVerticalDirection())
                }
                yPos -= speed;
            } else {
                if(yPos >= visualViewport.height || yPos + size >= visualViewport.height ){
                    bubble.setVerticalDirection(!bubble.getVerticalDirection())
                }
                yPos += speed;
            }

            if(bubble.getHorizontalDirection()){
                if(xPos <= 0){
                    bubble.setHorizontalDirection(!bubble.getHorizontalDirection())
                }
                xPos -= speed;
            } else {
                if(xPos >= visualViewport.width || xPos + size >= visualViewport.width){
                    bubble.setHorizontalDirection(!bubble.getHorizontalDirection())
                }
                xPos += speed;
            }

            bubble.setYPosition(yPos);
            bubble.setXPosition(xPos);
            document.getElementById('bubbles-container').children[bubble.id].style.top = yPos + "px";
            document.getElementById('bubbles-container').children[bubble.id].style.left = xPos + "px";
        })
    }, 5)
}

function createNewBubble(event){

    let previousBubbleSize = event.target != bubblesContainer ? Math.ceil((event.target.style.width.split("p")[0]) / 4) : null;

    if(event.target != bubblesContainer && previousBubbleSize <= BUBBLE_MIN_SIZE){
        return;
    }

    if(generatedBubbles.some(bubble=> bubble.getIsHovered())){
        return;
    }

    let id = generatedBubbles.length;
    let width = previousBubbleSize ?? Math.floor(Math.random() * (BUBBLE_MAX_SIZE-BUBBLE_MIN_SIZE) + BUBBLE_MIN_SIZE);
    let xPosition = event.pageX - (width /2);
    let yPosition = event.pageY - (width /2);
    let speed = Math.random() * (BUBBLE_MAX_SPEED-BUBBLE_MIN_SPEED) + BUBBLE_MIN_SPEED;
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

    bubbleDeletedEvent = true;
    bubblesContainer.removeEventListener('click', createNewBubble);
    clearTimeout(mainTimeout);
    generatedBubbles.splice(generatedBubbles.findIndex(bubble => bubble.id == event.target.id), 1);
    document.getElementById(event.target.id).remove();

    generatedBubbles.forEach((bubble, index) => {
        document.getElementById(bubble.id).setAttribute("id", index);
        bubble.id = index;
    })

    for(let i = 0; i < 4; i++){
        createNewBubble(event);
    }

    setTimeout(()=>{
        bubblesContainer.addEventListener('click', createNewBubble, false);
    }, 150)

    main();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}