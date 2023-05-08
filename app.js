let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let winner = null;
let ai = 'X';
let currentPlayer = human = 'O';
let cellWidth, cellHeight, cross, circle;

function preload() {
    cross = loadImage('assets/cross.png');
    circle = loadImage('assets/circle.png');
}

function setup() {
    let canvas = createCanvas(450, 450);
    canvas.mousePressed(makeMove);
    cellWidth = width / 3;
    cellHeight = height / 3;
}

function draw() {
    line(0, cellHeight, cellWidth * 3, cellHeight);
    line(0, cellHeight * 2, cellWidth * 3, cellHeight * 2);

    line(cellWidth, 0, cellWidth, cellHeight * 3);
    line(cellWidth * 2, 0, cellWidth * 2, cellHeight * 3);
}

function countOpenSpots() {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; i++) {
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
}

function makeMove() {
    let x = floor(mouseX / cellWidth);
    let y = floor(mouseY / cellHeight);

    if (board[x][y] == '') {
        board[x][y] = currentPlayer;
        currentPlayer = ai;
    }
}