const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const highScoreEl = document.getElementById("high-score");

let carLeft = 175;
let obstacleTop = -100;
let obstacleLeft = getRandomLane();
let speed = 4;
let score = 0;
let lives = 3;
let highScore = localStorage.getItem("carHighScore") || 0;

highScoreEl.textContent = highScore;

// Move car
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

window.moveLeft = function () {
  if (carLeft > 0) {
    carLeft -= 75;
    car.style.left = carLeft + "px";
  }
};

window.moveRight = function () {
  if (carLeft < 325) {
    carLeft += 75;
    car.style.left = carLeft + "px";
  }
};

function getRandomLane() {
  const lanes = [0, 75, 150, 225, 300];
  return lanes[Math.floor(Math.random() * lanes.length)];
}

function moveObstacle() {
  obstacleTop += speed;
  obstacle.style.top = obstacleTop + "px";
  obstacle.style.left = obstacleLeft + "px";

  if (obstacleTop > 600) {
    obstacleTop = -100;
    obstacleLeft = getRandomLane();
    score++;
    speed += 0.2;
    scoreEl.textContent = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("carHighScore", highScore);
      highScoreEl.textContent = highScore;
    }
  }

  if (
    obstacleTop + 100 >= 500 &&
    obstacleLeft < carLeft + 50 &&
    obstacleLeft + 50 > carLeft
  ) {
    lives--;
    livesEl.textContent = lives;

    if (lives <= 0) {
      alert("💥 Game Over! Final Score: " + score);
      window.location.reload();
    } else {
      // Reset obstacle
      obstacleTop = -100;
      obstacleLeft = getRandomLane();
    }
  }

  requestAnimationFrame(moveObstacle);
}

moveObstacle();
