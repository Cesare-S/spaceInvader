export class Enemy {
    x;
    y;
    image;
    speed = 2;
    width = 100;
    height = 100;
    health = 2;
    state = 3
    explosion;
    hited = false;
    frame = 0;

    constructor(x, y, speed) {

        this.x = x;
        this.y = y;
        this.speed = speed

        this.image = document.getElementById("enemy");


        this.explosion = document.getElementById("explosion");

    }

    // drawing the enemy image on the screen
    draw(ctx) {

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Adjust the coordinates and dimensions as needed

        if (this.hited == true) {

            if (this.frame >= 60) {
                this.hited = false;
            }

            ctx.drawImage(this.explosion, this.x + 25, this.y + (this.width / 2), this.width / 2, this.height / 2); // Adjust the coordinates and dimensions as needed

        }

        this.frame = this.frame + 1;

    }

    // move the enemy to left and right
    move() {

        // move the enemy to the right and left
        if (this.state == 2) {
            this.x -= this.speed;
        }

        if (this.state == 3) {
            this.x += this.speed;
        }

    }

    // setting movement of the enemy with reaspect to other enemy in the row
    setState(state) {
        if (state != undefined) {
            this.state = state
        }
    }

    // reducting the enemy health by 1
    reduceHealth() {
        this.health = this.health - 1;
    }


}