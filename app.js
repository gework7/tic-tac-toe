let board = [
    ['X', 'O', 'O'],
    ['X', 'O', ''],
    ['X', '', '']
]

let winner = null;
let ai = 'X';
let currentPlayer = human = 'O';
let cellWidth, cellHeight, crossMark, circleMark;

function preload() {
    crossMark = loadImage('assets/cross.png');
    circleMark = loadImage('assets/circle.png');
}

function setup() {
    let canvas = createCanvas(450, 450);
    canvas.mousePressed(makeMove);
    cellWidth = width / 3;
    cellHeight = height / 3;
}

function drawGrid() {
    line(0, cellHeight, cellWidth * 3, cellHeight);
    line(0, cellHeight * 2, cellWidth * 3, cellHeight * 2);
    line(cellWidth, 0, cellWidth, cellHeight * 3);
    line(cellWidth * 2, 0, cellWidth * 2, cellHeight * 3);
}

function draw() {
    strokeWeight(4);
    drawGrid();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {

            let x = cellHeight * j + cellHeight / 2;
            let y = cellWidth * i + cellWidth / 2;
            let spot = board[i][j];

            if (spot === human) {
                image(circleMark, x - 60, y - 60, 120, 120);
            } else if (spot === ai) {
                image(crossMark, x - 60, y - 60, 120, 120);
            }
        }
    }

    let result = checkWinner();
    if (result !== null) {
        noLoop();
        if (result === 'tie') {
            document.getElementById('result').innerHTML = 'Tie!';
        } else {
            document.getElementById('result').innerHTML = `${result} wins`;
        }
    }
}

function countOpenSpots() {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === '') {
                count++;
            }
        }
    }
    return count;
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    let winner = null;

    for (let i = 0; i < board.length; i++) {

        // horizontal check
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            return board[i][0];
        }

        // vertical check
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            return board[0][i];
        }
    }

    // diagonal check
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        return board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        return board[2][0];
    }

    return countOpenSpots() === 0 ? 'tie' : null;
}

function makeMove() {
    let x = floor(mouseX / cellWidth);
    let y = floor(mouseY / cellHeight);

    if (checkWinner() == null && board[x][y] == '') {
        board[x][y] = currentPlayer;
        currentPlayer = ai;
    }
}