export default class Bubble{

    id;
    xPosition;
    yPosition;
    width;
    height;
    speed;
    verticalDirection;
    horizontalDirection;
    isHovered;
    beingCreated;

    constructor(id, xPosition, yPosition, width, height, speed, verticalDirection, horizontalDirection, isHovered, beingCreated){
        this.id = id;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.verticalDirection = verticalDirection;
        this.horizontalDirection = horizontalDirection;
        this.isHovered = isHovered;
        this.beingCreated = beingCreated;
    }
    
}