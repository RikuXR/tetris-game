const cvs = document.getElementById("tetris"),
  ctx = cvs.getContext("2d");

const ROW = 20,
  COL = (COLUMN = 10),
  SQ = (squareSize = 20),
  VACANT = "#fff";

// draw a square
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = "#333";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

draw(0, 0, "red");
