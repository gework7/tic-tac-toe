let scores = {
    'X': 1,
    'O': -1,
    'tie': 0
}

function minimax(board, isMaximizing) {
    let score = checkWinner();
    if (score !== null) {
        return scores[score];
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === '') {
                board[i][j] = isMaximizing ? ai : human;
                let score = minimax(board, !isMaximizing);
                board[i][j] = '';
                bestScore = isMaximizing ? max(score, bestScore) : min(score, bestScore);
            }
        }
    }
    return bestScore;
}

function findBestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === '') {
                board[i][j] = ai;
                let score = minimax(board, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

    updateBackgroundColor();
    setTimeout(() => {
        board[move.i][move.j] = ai;
        currentPlayer = human;
        updateBackgroundColor();
    }, 2000)
}