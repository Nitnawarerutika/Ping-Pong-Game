import "./styles.css";

let start = false;
let movement = null;
let score = null;
let maxScore = null;
let ballSpeedX = 2;
let ballSpeedY = 2;
let rod1 = document.getElementById("rod-1");
let rod2 = document.getElementById("rod-2");
let ball = document.getElementById("pong");

const rod1Name = "Rod 1";
const rod2Name = "Rod 2";
const storeName = "PPName";
const storeScore = "PPMaxScore";

let window_width = window.innerWidth;
let window_height = window.innerHeight;

rod1.style.left = 0;
rod2.style.left = 0;
ball.style.top = "30px";
ball.style.left = window_width / 2 - 10 + "px";

function resetBoard(rodName) {
  rod1.style.left = 0;
  rod2.style.left = 0;
  ball.style.left = window_width / 2 - 10 + "px";

  // Lossing player gets the ball
  if (rodName === rod2Name) {
    ball.style.top = "30px";
    ballSpeedY = 2;
  } else if (rodName === rod1Name) {
    ball.style.top = "100%" - "30px";
    ballSpeedY = -2;
  }

  score = 0;
  start = false;
}

function storeWin(rod, score) {
  maxScore = localStorage.getItem(storeScore);
  if (score > maxScore) {
    maxScore = score;
    localStorage.setItem(storeName, rod);
    localStorage.setItem(storeScore, maxScore);
  }

  clearInterval(movement);
  resetBoard(rod);

  alert(
    rod +
      " wins with a score of " +
      score * 100 +
      ". Max score is: " +
      maxScore * 100
  );
}

window.addEventListener("keypress", function (event) {
  switch (event.key) {
    case "Enter":
      if (!start) {
        start = true;
        let ballRect = ball.getBoundingClientRect();
        let ballX = ballRect.x;
        let ballY = ballRect.y;
        let ballDia = ballRect.width;

        let rod1Height = rod1.offsetHeight;
        let rod2Height = rod2.offsetHeight;
        let rod1Width = rod1.offsetWidth;
        let rod2Width = rod2.offsetWidth;

        movement = setInterval(function () {
          // Move ball
          let coordinates1 = rod1.getBoundingClientRect();
          let coordinates2 = rod2.getBoundingClientRect();
          ballX += ballSpeedX;
          ballY += ballSpeedY;

          let rod1X = coordinates1.x;
          let rod2X = coordinates2.x;

          ball.style.left = ballX + "px";
          ball.style.top = ballY + "px";

          if (ballX + ballDia > window_width || ballX < 0) {
            ballSpeedX = -ballSpeedX; // Reverses the direction
          }

          // It specifies the center of the ball on the viewport
          let ballPos = ballX + ballDia / 2;

          // Check for Rod 1
          if (ballY <= rod1Height) {
            ballSpeedY = -ballSpeedY; // Reverses the direction
            score++;

            // Check if the game ends
            if (ballPos < rod1X || ballPos > rod1X + rod1Width) {
              storeWin(rod2Name, score);
            }
          }

          // Check for Rod 2
          else if (ballY + ballDia >= window_height - rod2Height) {
            ballSpeedY = -ballSpeedY; // Reverses the direction
            score++;

            // Check if the game ends
            if (ballPos < rod2X || ballPos > rod2X + rod2Width) {
              storeWin(rod1Name, score);
            }
          }
        }, 10);
      }
      break;

    case "a":
      if (start && parseInt(rod1.style.left) > -34) {
        rod1.style.left = parseInt(rod1.style.left) - 2 + "%";
        rod2.style.left = parseInt(rod2.style.left) - 2 + "%";
      }
      break;

    case "d":
      if (start && parseInt(rod1.style.left) < 34) {
        rod1.style.left = parseInt(rod1.style.left) + 2 + "%";
        rod2.style.left = parseInt(rod2.style.left) + 2 + "%";
      }
      break;

    default:
    // code
  }
});
