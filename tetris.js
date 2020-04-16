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

// Create the board
let board = [];
for (let r = 0; r < ROW; r++) {
  board[r] = [];
  for (let c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// Draw the board
function drawBoard() {
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

// Pieces and their colors
const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"],
];

// Initiate a Piece
let p = new Piece(PIECES[0][0], PIECES[0][1]);

// The object piece
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  this.x = 0;
  this.y = 0;
}

// Draw a Piece to the board
Piece.prototype.draw = function () {
  this.fill(this.color);
};

// Undraw a Piece
Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};

// Fill function
Piece.prototype.fill = function (color) {
  for (let r = 0; r < this.activeTetromino.length; r++) {
    for (let c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// Move Down the Piece
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  }
};

// Move Right the Piece
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// Move Left the Piece
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// Rotate the Piece
Piece.prototype.rotate = function () {
  let nextPattern = this.tetromino[
    (this.tetrominoN + 1) % this.tetromino.length
  ];

  if (!this.collision(0, 0, nextPattern)) {
    this.unDraw();
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

// Collision function
Piece.prototype.collision = function (x, y, piece) {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece.length; c++) {
      // if the square is empty skip
      if (!piece[r][c]) {
        continue;
      }
      // coordinates of the piece after movement
      let newX = this.x + c + x,
        newY = this.y + r + y;

      if (newX < 0 || newX > COL || newY >= ROW) return true;

      // skip newY < 0; board[-1] will crush
      if (newY < 0) continue;

      // check a locked piece
      if (board[newY][newX] !== VACANT) return true;
    }
  }

  return false;
};

// Control the Piece
document.addEventListener("keydown", CONTROL);

function CONTROL(e) {
  if (event.keyCode === 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode === 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode === 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode === 40) {
    p.moveDown();
  }
}

// Drop the piece every second

let dropStart = Date.now();
function drop() {
  let now = Date.now(),
    delta = now - dropStart;

  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }

  requestAnimationFrame(drop);
}

drop();
