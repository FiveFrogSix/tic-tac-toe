<script lang="ts" setup>
interface MiniMax {
  index?: number | null;
  score: number;
}

const board = ref<Array<string | null>>(Array(9).fill(null));
const currentPlayer = ref("X");
const winner = ref<string | null>(null);
const scoreX = ref(0); // คะแนนของผู้เล่น X
const scoreO = ref(0); // คะแนนของผู้เล่น O
const statusPlay = ref(false);

function makeMove(index: number) {
  if (!board.value[index] && !winner.value) {
    board.value[index] = currentPlayer.value;
    if (checkWinner(board.value, currentPlayer.value)) {
      winner.value = currentPlayer.value;
      updateScore(winner.value);
    } else if (!board.value.includes(null)) {
      winner.value = "Draw";
    } else {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    }
  }
}

function checkWinner(board: Array<string | null>, player: string) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] === player && board[b] === player && board[c] === player;
  });
}

function botMove() {
  const bestMove = minimax(board.value, "O");
  if (bestMove.index !== undefined && bestMove.index !== null) {
    makeMove(bestMove.index);
    statusPlay.value = false;
  }
}

function minimax(newBoard: Array<string | null>, player: string) {
  const emptyCells = newBoard
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null) as number[];

  if (checkWinner(newBoard, "X")) {
    return { score: -10 };
  } else if (checkWinner(newBoard, "O")) {
    return { score: 10 };
  } else if (emptyCells.length === 0) {
    return { score: 0 };
  }

  const moves: MiniMax[] = [];

  for (let i = 0; i < emptyCells.length; i++) {
    const index = emptyCells[i];
    const move: MiniMax = { index: index, score: 0 };

    newBoard[index] = player;

    if (player === "O") {
      const result = minimax(newBoard, "X");
      move["score"] = result.score;
    } else {
      const result = minimax(newBoard, "O");
      move["score"] = result.score;
    }

    newBoard[index] = null;
    moves.push(move);
  }

  const bestMove: MiniMax = { index: null, score: 0 };

  if (player === "O") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove.index = moves[i].index;
        bestMove.score = moves[i].score;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove.index = moves[i].index;
        bestMove.score = moves[i].score;
      }
    }
  }

  return bestMove;
}

function resetGame() {
  board.value = Array(9).fill(null);
  currentPlayer.value = "X";
  winner.value = null;
}

watch(currentPlayer, (newPlayer) => {
  if (newPlayer === "O" && !winner.value) {
    statusPlay.value = true;
    setTimeout(botMove, 700);
  }
});

function updateScore(winner: string | null) {
  if (winner === "X") {
    scoreX.value += 1; // เพิ่มคะแนนให้ผู้เล่น X
  } else if (winner === "O") {
    scoreO.value += 1; // เพิ่มคะแนนให้ผู้เล่น O
  }
}
</script>
<template>
  <NuxtLayout name="play">
    <div class="d-flex justify-content-center">
      <GameBoard :disabled="statusPlay">
        <template v-for="(cell, index) in board" :key="index">
          <button
            class="btn board-cell"
            :class="{
              'player-x': cell === 'X',
              'player-o': cell === 'O',
            }"
            @click="makeMove(index)"
          >
            {{ cell }}
          </button>
        </template>
      </GameBoard>
    </div>
    <div class="row">
      <div class="col text-end">Player X: {{ scoreX }}</div>
      <div class="col">Player O: {{ scoreO }}</div>
    </div>
    <div class="text-center">
      <p v-if="winner">{{ winner }}</p>
    </div>
    <div class="text-center">
      <button class="btn btn-danger btn-sm" @click="resetGame">RESET</button>
    </div>
  </NuxtLayout>
</template>
