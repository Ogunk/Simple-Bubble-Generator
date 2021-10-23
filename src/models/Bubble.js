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

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getXPosition(){
        return this.xPosition;
    }

    setXPosition(xPosition){
        this.xPosition = xPosition;
    }

    getYPosition(){
        return this.yPosition;
    }

    setYPosition(yPosition){
        this.yPosition = yPosition;
    }

    getWidth(){
        return this.width;
    }

    setWidth(width){
        this.width = width;
    }

    setHeight(height){
        this.height = height;
    }

    getSpeed(){
        return this.speed;
    }

    setSpeed(speed){
        this.speed = speed;
    }

    getVerticalDirection(){
        return this.verticalDirection;
    }

    setVerticalDirection(direction){
        this.verticalDirection = direction;
    }

    getHorizontalDirection(){
        return this.horizontalDirection;
    }

    setHorizontalDirection(direction){
        this.horizontalDirection = direction;
    }

    getIsHovered(){
        return this.isHovered;
    }

    setIsHovered(value){
        this.isHovered = value;
    }

    getIsBeingCreated(){
        return this.beingCreated;
    }

    setIsBeingCreated(value){
        this.beingCreated = value;
    }
}