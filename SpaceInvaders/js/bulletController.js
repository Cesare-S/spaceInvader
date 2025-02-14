
export class BulletController {

  // array to store the list of the bullets
  bullets = [];

  constructor() { }

  // will add the bullet object in the array
  addBullet(passedObject) {
      this.bullets.push(passedObject);
  }

  // will draw and will remove the bullets that are not active that are outside the canvas or hit the enemy
  animateCollisionBullet(ctx, enemyObjet,playerObject) {
      for (let index = 0; index < this.bullets.length; index++) {

          const element = this.bullets[index];

          if (element.isActive == true) {

              element.draw(ctx,"gold");
              element.update(-1);

              let result =this.checkCollision(element, enemyObjet);
              // checks if the bullet hits the enemy
              if (result['status']) {

                  result['enemy'].hited=true;                    
                  result['enemy'].reduceHealth();
                  element.isActive = false;
                  playerObject.increaseScore();
              }

          }
          else {
              this.bullets.splice(index, 1);
          }

      }
  }


  // checks if the bullets collides with the enemy
  checkCollision(bullet, enemyObject) {


      let index = 0;


      while (enemyObject.enemyFirstRow[index] != undefined || enemyObject.enemySecondRow[index] != undefined || enemyObject.enemyThirdRow[index] != undefined) {

          if (enemyObject.enemyFirstRow[index] != undefined && bullet.x < enemyObject.enemyFirstRow[index].x + enemyObject.enemyFirstRow[index].width &&
              bullet.x + bullet.size > enemyObject.enemyFirstRow[index].x &&
              bullet.y < enemyObject.enemyFirstRow[index].y + enemyObject.enemyFirstRow[index].height &&
              bullet.y + bullet.size > enemyObject.enemyFirstRow[index].y) {

              return { status: true, enemy: enemyObject.enemyFirstRow[index] };

          }

          if (enemyObject.enemySecondRow[index] != undefined && bullet.x < enemyObject.enemySecondRow[index].x + enemyObject.enemySecondRow[index].width &&
              bullet.x + bullet.size > enemyObject.enemySecondRow[index].x &&
              bullet.y < enemyObject.enemySecondRow[index].y + enemyObject.enemySecondRow[index].height &&
              bullet.y + bullet.size > enemyObject.enemySecondRow[index].y) {

              return { status: true, enemy: enemyObject.enemySecondRow[index] };

          }

          if (enemyObject.enemyThirdRow[index] != undefined && bullet.x < enemyObject.enemyThirdRow[index].x + enemyObject.enemyThirdRow[index].width &&
              bullet.x + bullet.size > enemyObject.enemyThirdRow[index].x &&
              bullet.y < enemyObject.enemyThirdRow[index].y + enemyObject.enemyThirdRow[index].height &&
              bullet.y + bullet.size > enemyObject.enemyThirdRow[index].y) {

              return { status: true, enemy: enemyObject.enemyThirdRow[index] };

          }


          index = index + 1;

      }

      return { status: false, enemy: enemyObject.enemyThirdRow[index] };


  }

}