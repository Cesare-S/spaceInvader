export class Player {

    // variables to control the movement ofplayer on the screen
    x;
    y;
    speed = 10; //speed of the player
    width = 100;
    height = 100;
    state = 1;
    frameX = 0; //frame on sprite
    frameY = 0; //frame on sprite
    moving = false; //if the object is moving or not
    health = 10;
    score = 0;

    ship_1;
    ship_2;
    ship_3;

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.orignalX = x;
        this.orignalY = y;

        // getting the images of the player
        this.ship_1 = document.getElementById("ship_1");
        this.ship_2 = document.getElementById("ship_2");
        this.ship_3 = document.getElementById("ship_3");

    }


    increaseScore() {
        this.score += 1;
    }

    drawPlayer(ctx) {

        // getting the state of the player and checking if it still moving if it is pause chaning the state to 1 that is staionary and drawing the player
        if (this.moving == true) {
            ctx.drawImage(this.getStateImage(), this.frameX, this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
            this.moving = false;
        } else {
            this.state = 1;
            ctx.drawImage(this.getStateImage(), this.frameX, this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }


    // return the image based on the state that is 1 for stationary 2 for left and 3 for right
    getStateImage() {
        if (this.state == 1) {
            return this.ship_1;
        } else if (this.state == 2) {
            return this.ship_2;
        } else if (this.state == 3) {
            return this.ship_3;
        }
    }


    // updating player according to the keys pressed by the players
    UpdatePlayer(keys, canvasWidth, canvasHeight) {

        if (keys.ArrowUp) {
            this.y -= this.speed;
            this.state = 1;
            this.moving = true;
        }
        if (keys.ArrowDown) {
            this.y += this.speed;
            this.state = 1;
            this.moving = true;
        }
        if (keys.ArrowLeft) {
            this.x -= this.speed;
            this.state = 2;
            this.moving = true;
        }
        if (keys.ArrowRight) {
            this.x += this.speed;
            this.state = 3;
            this.moving = true;
        }

        this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
        this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));

    }


    reduceHealth() {
        this.health = this.health - 1;
    }

    orignalPosition() {
        this.x = this.orignalX;
        this.y = this.orignalY;
    }



}