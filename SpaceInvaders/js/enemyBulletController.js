export class EnemyBulletController {

  bullets = [];

  constructor() { }

  // adding bullet innthe bullet array
  addBullet(passedObject) {
      this.bullets.push(passedObject);
  }

  // drawing  bullets and moving them also checking the collision of them
  animateCollisionBullet(ctx, playerObject) {
      for (let index = 0; index < this.bullets.length; index++) {

          const element = this.bullets[index];

          if (element.isActive == true) {

              element.draw(ctx, "white");
              element.update(1);

              if (this.checkCollision(element, playerObject)) {

                  element.isActive=false;
                  playerObject.reduceHealth();

              }

          }
          else {
              this.bullets.splice(index, 1);
          }

      }
  }


  // checking the collision betwen the player and bullet
  checkCollision(bullet, playerObject) {
      
      if (bullet.x < playerObject.x + playerObject.width &&
          bullet.x + bullet.size > playerObject.x &&
          bullet.y < playerObject.y + playerObject.height &&
          bullet.y + bullet.size > playerObject.y) {

          return true;

      }

      return false;

  }

}