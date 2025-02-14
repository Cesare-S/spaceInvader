export class Bullet {

    x;
    y;
    speed = 3;
    size = 5;
    isActive = true;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    // making the bullet move upwards by reducting the speed of the bullet until it goes out the canvas and make it inactive passed sign make bullet move upwards and downwards
    update(passedSign) {

        if (this.isActive) {

            this.y = this.y + (this.speed * passedSign);

            if (this.y < 0 || this.y > 670) {

                this.isActive = false;

            }
        }
    }


    // drawing the bullets on the screen in gold color
    draw(ctx, color) {

        if (this.isActive) {

            ctx.fillStyle = color;
            ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size * 2);

        }
    }


}