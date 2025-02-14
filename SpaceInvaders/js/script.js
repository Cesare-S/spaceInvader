import { Player } from "./player.js";
import { BulletController } from "./bulletController.js";
import { Bullet } from "./bullet.js";
import { EnemyController } from "./enemyController.js";
import { Enemy } from "./enemy.js";
import { EnemyBulletController } from "./enemyBulletController.js";

window.addEventListener("load", () => {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = 1500;
    let canvasHeight = 670;
    let playerObject = new Player(700, 550);
    let bulletControllerObject = new BulletController();
    let enemyControllerObject = new EnemyController();
    let enemyBulletControllerObject = new EnemyBulletController();
    let keys = {};
    let gameOver = false;
    let gameWon = false;
    let gameStart = false;
    let storyMode = false;
    let allowBullet = 5;
    let escpaeBar = true;
    let playerImage = document.getElementById("ship_1");
    let gameBackgroundImage = document.getElementById("gameBackgroundImage");
    let gamestate = document.getElementById("gamestate");
    let paragraphText = ` In the year 2080 humans try to build bases on the moon since the earth is on the verge of collapsing because of an environmental crisis. They found out that they are not alone on the moon, a race of aliens called Jotor live underneath the surface. The jotors show to humans an old declaration from the first moon landing that says how it is forbidden for humans to ever step again on the moon. Now the humans will pay a very high price, the final destruction of their race and colonization of the world. They will need to fight to defend earth from an aggression war. During the war they will understand the importance of the human race and how earth needs to still be saved and lived by humans. In the game we are captain Kyle, with his spaceship he will face a suicidal mission to protect one of the last inhabited cities on earth......`;
    let frame = 0;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    function main() {

        assignEnemies();
        animate();

    }

    // making enemies objects and stiooring them in enemies controller
    function assignEnemies() {
        for (let index = 0; index < 10; index++) {
            enemyControllerObject.loadEnemies(1, new Enemy(250 + (100 * index), 70, 1))
        }

        for (let index = 0; index < 8; index++) {
            enemyControllerObject.loadEnemies(2, new Enemy(350 + (100 * index), 170, 1))
        }

        for (let index = 0; index < 6; index++) {
            enemyControllerObject.loadEnemies(3, new Enemy(450 + (100 * index), 270, 1))
        }




    }

    // function that will be the main loop of the game
    function animate() {

        // clearing canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);


        // filling back of canvas with black color
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);


        // drawing stars on canvas

        // applying condition on which screen to chose based on letiables
        if (gameStart == true) {
            drawGameScreen();
        }

        if (gameStart == false) {
            drawGameStarMenu();
        }

        if (gameWon == true) {
            drawEndTest("Game Won!");
        }

        if (gameOver == true) {

            drawEndTest("Game Over!");
        }


        requestAnimationFrame(animate);
    }

    // drawing the start and story button with space ship image and text on top
    function drawGameStarMenu() {

        ctx.drawImage(gameStartMenuImage, 0, 0, canvasWidth, canvasHeight);

    }

    // drawing game won on the screen
    function drawEndTest(text) {

        ctx.drawImage(gamestate, 0, 0, canvasWidth, canvasHeight);

        let gameWonText = text;
        let x = canvas.width / 2; // Center horizontally
        let y = canvas.height / 2; // Center vertically

        ctx.font = "bold 48px Arial";
        ctx.fillStyle = "black";
        ctx.lineWidth = 4;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeText(gameWonText, x, y);

        ctx.fillStyle = "gold";
        ctx.fillText(gameWonText, x, y);
    }

    // drawing updating the player , enemies and bullets it start running when the game is started
    function drawGameScreen() {

        ctx.drawImage(gameBackgroundImage, 0, 0, canvasWidth, canvasHeight);

        playerObject.drawPlayer(ctx);

        playerObject.UpdatePlayer(keys, canvasWidth, canvasHeight);

        gameWon = enemyControllerObject.animateEnemy(ctx, canvasWidth, canvasHeight);

        bulletControllerObject.animateCollisionBullet(ctx, enemyControllerObject.getEnemiesArray(), playerObject);

        // adding pause to stop bullets for a while
        if (frame >= 280) {
            addEnemyBullet(enemyControllerObject.getRandomEnemies());
            frame = 0;
        }

        enemyBulletControllerObject.animateCollisionBullet(ctx, playerObject);

        enemyControllerObject.checkPlayerEnemyCollision(playerObject);

        drawScore();

        drawHealth();

        frame = frame + 1;

        if (playerObject.health <= 0) {
            gameOver = true;
        }

    }

    function addEnemyBullet(passedArray) {
        for (let index = 0; index < passedArray.length; index++) {
            const element = passedArray[index];
            enemyBulletControllerObject.addBullet(new Bullet(element.x, element.y));
        }
    }

    // add a new bulet object in bullet controll manager
    function shoot() {

        if (bulletControllerObject.bullets.length < allowBullet) {
            bulletControllerObject.addBullet(new Bullet(playerObject.x + (playerObject.width / 2), playerObject.y - 10));
        }
    }

    // will draw score on screen
    function drawScore() {
        let scoreText = "SCORE : " + playerObject.score;
        let x = canvas.width - 20;
        let y = 50;

        ctx.font = "bold 34px Arial";
        ctx.fillStyle = "black";
        ctx.lineWidth = 4;
        ctx.textAlign = "right";
        ctx.strokeText(scoreText, x, y);

        ctx.fillStyle = "gold";
        ctx.fillText(scoreText, x, y);
    }

    // will draw player health on screen
    function drawHealth() {
        let scoreText = "HEALTH : " + playerObject.health;
        let x = 200;
        let y = 50;

        ctx.font = "bold 34px Arial";
        ctx.fillStyle = "black";
        ctx.lineWidth = 4;
        ctx.textAlign = "right";
        ctx.strokeText(scoreText, x, y);

        ctx.fillStyle = "gold";
        ctx.fillText(scoreText, x, y);
    }

    // will write the story as typing effect 
    function writeStory() {
        storyMode = true;

        let x = 50;
        let y = 50;
        let fontSize = 18;
        let lineHeight = 25;
        let typingSpeed = 50; // Adjust typing speed as needed

        let index = 0;
        let currentLine = "";
        let allLines = [];

        // to make a typing effect calling this function with above letiables 
        function update() {

            ctx.drawImage(gamestate, 0, 0, canvasWidth, canvasHeight);

            // taking the current charactor making new lines 
            if (paragraphText[index] != undefined) {
                currentLine += paragraphText[index];
                index++;
            }

            ctx.font = "bold " + fontSize + "px Arial";
            ctx.fillStyle = "gold";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";

            // writing the current line
            for (let i = 0; i < allLines.length; i++) {
                ctx.fillText(allLines[i], x, y + i * lineHeight);
            }

            ctx.fillText(currentLine, x, y + allLines.length * lineHeight);

            if (ctx.measureText(currentLine).width > canvas.width - 2 * x) {
                allLines.push(currentLine);
                currentLine = "";
            }

            // adding a press to escape text below on story mode
            let gameWonText = "Press Space To Skip !....";

            ctx.font = "bold 48px Arial";
            ctx.fillStyle = "gold";
            ctx.lineWidth = 4;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeText(gameWonText, canvas.width / 2, canvas.height - 100);

            ctx.fillStyle = "gold";
            ctx.fillText(gameWonText, canvas.width / 2, canvas.height - 100);

            if ((index < paragraphText.length || storyMode == true) && escpaeBar == true) {
                requestAnimationFrame(update);
            }
        }



        update();




    }

    // adding click event on buttons
    canvas.addEventListener("click", function(event) {

        let mouseX = event.clientX - canvas.getBoundingClientRect().left;
        let mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (
            mouseX >= 365 &&
            mouseX <= 365 + 260 &&
            mouseY >= 375 - 30 &&
            mouseY <= 375 + 30
        ) {

            // to escape the story mode and start the game
            gameStart = true;
            escpaeBar = true;

        }

        if (
            mouseX >= 850 &&
            mouseX <= 850 + 260 &&
            mouseY >= 375 - 30 &&
            mouseY <= 375 + 30
        ) {

            // to write a story on canvas
            writeStory()


        }


    });

    // to keep the movement of the player on the screen
    window.addEventListener("keydown", function(event) {

        if (event.code === "Space" || event.code === "Spacebar") {

            // if in story mode escape it else shoot bullet if bullet is less then allowed length
            if (storyMode == true) {
                storyMode = false;
                escpaeBar = false;
            } else {
                shoot();
            }
        } else {
            keys[event.code] = true;
        }

    });

    // adding the keycode to change on keydown to true
    window.addEventListener("keyup", function(event) {
        keys[event.code] = false;
    });

    main();

})