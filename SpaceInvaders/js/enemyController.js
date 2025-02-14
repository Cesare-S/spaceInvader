export class EnemyController {

  enemyFirstRow = [];//will store the enemies in first row
  enemySecondRow = [];//will store the enemies in second row
  enemyThirdRow = [];//will store the enemies in third row

  enemyBulletList = [];

  constructor() { }

  // loading enemies in diffrent array that is storing their object in arrays
  loadEnemies(arrayNo, enemyObject) {

      if (arrayNo == 1) {
          this.enemyFirstRow.push(enemyObject)
      }
      else if (arrayNo == 2) {
          this.enemySecondRow.push(enemyObject)
      }
      else {
          this.enemyThirdRow.push(enemyObject)

      }
  }

  // making the enemy move with respect to the first row
  animateEnemy(ctx, canvasWidth, canvasHeight) {

      let index = 0;

      // getting the state the direction of movement of the enemies wirth respect to the foirst row enemy
      let fisrtRowState = this.getRowState(this.enemyFirstRow, canvasWidth);
      let SecondRowState = fisrtRowState;
      let ThirdRowState = fisrtRowState;
      let response = null;

// running through all three arrays of enemies drawing them and removing them if they are dead
      while (this.enemyFirstRow[index] != undefined || this.enemySecondRow[index] != undefined || this.enemyThirdRow[index] != undefined) {


          if (this.enemyFirstRow[index] != undefined) {
              this.enemyFirstRow[index].setState(fisrtRowState);
              response = this.drawEnemy(this.enemyFirstRow[index], ctx);

              if (response == false) {
                  this.enemyFirstRow.splice(index, 1);
              }

          }

          if (this.enemySecondRow[index] != undefined) {
              this.enemySecondRow[index].setState(SecondRowState);
              response = this.drawEnemy(this.enemySecondRow[index], ctx);


              if (response == false) {
                  this.enemySecondRow.splice(index, 1);
              }
          }

          if (this.enemyThirdRow[index] != undefined) {
              this.enemyThirdRow[index].setState(ThirdRowState);
              response = this.drawEnemy(this.enemyThirdRow[index], ctx, canvasWidth, canvasHeight);


              if (response == false) {
                  this.enemyThirdRow.splice(index, 1);
              }
          }

          index = index + 1;
      }

      if (this.enemyFirstRow.length == 0 && this.enemySecondRow.length == 0 && this.enemyThirdRow.length == 0) {
          return true;
      }
      else {
          return false;
      }
  }

  // getting in which wasy the enemy in the row have to move wiith respect to first and last element move left oiif last element hit the canvas width and rioight if left going outside the screen
  getRowState(passedArray, canvasWidth) {
      let firstElement = passedArray[0];
      let lastElement = passedArray[passedArray.length - 1];
      let state = null;

      if (firstElement && !(firstElement.x - firstElement.speed > 0)) {
          state = 3;
      } else if (firstElement && !(firstElement.x + firstElement.speed < canvasWidth - firstElement.width)) {
          state = 2;
      }

      if (lastElement && !(lastElement.x - lastElement.speed > 0)) {
          state = 3;
      } else if (lastElement && !(lastElement.x + lastElement.speed < canvasWidth - lastElement.width)) {
          state = 2;
      }



      return state;
  }

  // DRAWING ALL THE enemies with health greater then 0
  drawEnemy(element, ctx, canvasWidth, canvasHeight) {
      if (element.health > 0) {
          element.draw(ctx);
          element.move();
          return true;
      }

      return false;
  }

  // returning enemies arrays for collisionb detection
  getEnemiesArray() {

      return { "enemyFirstRow": this.enemyFirstRow, "enemySecondRow": this.enemySecondRow, "enemyThirdRow": this.enemyThirdRow }

  }

  // getting random enemies to fire bullet
  getRandomEnemies() {
      const allEnemies = this.enemyFirstRow.concat(this.enemySecondRow, this.enemyThirdRow);

      this.shuffleArray(allEnemies);

      const randomEnemies = allEnemies.slice(0, 5);

      let temp = [];

      for (let index = 0; index < randomEnemies.length; index++) {
          const element = randomEnemies[index];
          temp.push({ "x": element.x + 10, "y": element.y + 100 })
      }

      return temp;

  }

  // shuffling array to make it random
  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  // checking the enemy and player colliision and reducing health moving playerto orignal position if it hit enemy
  checkPlayerEnemyCollision(playerObject) {


      let index = 0;


      while (this.enemyFirstRow[index] != undefined || this.enemySecondRow[index] != undefined || this.enemyThirdRow[index] != undefined) {

          if (this.enemyFirstRow[index] != undefined &&   playerObject.x < this.enemyFirstRow[index].x + this.enemyFirstRow[index].width &&
              playerObject.x + playerObject.width > this.enemyFirstRow[index].x &&
              playerObject.y < this.enemyFirstRow[index].y + this.enemyFirstRow[index].height &&
              playerObject.y + playerObject.height > this.enemyFirstRow[index].y) {

                  playerObject.reduceHealth();

                  playerObject.orignalPosition();


          }

          if (this.enemySecondRow[index] != undefined &&   playerObject.x < this.enemySecondRow[index].x + this.enemySecondRow[index].width &&
              playerObject.x + playerObject.width > this.enemySecondRow[index].x &&
              playerObject.y < this.enemySecondRow[index].y + this.enemySecondRow[index].height &&
              playerObject.y + playerObject.height > this.enemySecondRow[index].y) {

                  playerObject.reduceHealth();

                  playerObject.orignalPosition();


          }

          if (this.enemyThirdRow[index] != undefined &&   playerObject.x < this.enemyThirdRow[index].x + this.enemyThirdRow[index].width &&
              playerObject.x + playerObject.width > this.enemyThirdRow[index].x &&
              playerObject.y < this.enemyThirdRow[index].y + this.enemyThirdRow[index].height &&
              playerObject.y + playerObject.height > this.enemyThirdRow[index].y) {

                  playerObject.reduceHealth();

                  playerObject.orignalPosition();

          }


          index = index + 1;

      }



  }
}