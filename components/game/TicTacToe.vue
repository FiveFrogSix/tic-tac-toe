<script lang="ts" setup>
const router = useRouter();
const auth = useAuthStore();
const { user } = storeToRefs(useAuthStore());

interface MiniMax {
  index?: number | null;
  score: number;
}

const board = ref<Array<string | null>>(Array(9).fill(null));
const roundPlayer = ref("X");
const currentPlayer = ref("X");
const winner = ref<string | null>(null);
const scoreX = ref(0); // คะแนนของผู้เล่น X
const scoreO = ref(0); // คะแนนของผู้เล่น O
const winStack = ref(0); // คะแนนชนะต่อเนื่อง
const statusPlay = ref(false);

function makeMove(index: number) {
  if (!board.value[index] && !winner.value) {
    board.value[index] = currentPlayer.value;
    if (checkWinner(board.value, currentPlayer.value)) {
      const nameplayer = currentPlayer.value === "X" ? "Player" : "Bot";
      winner.value = `${nameplayer} The Winner`;
      updateScore(currentPlayer.value);
    } else if (!board.value.includes(null)) {
      winner.value = "Draw";
    } else {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    }

    if (winner.value) setTimeout(newRound, 2000);
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
  if (board.value.every((cell) => cell === null)) {
    const numbers = [0, 2, 4, 5, 6, 8];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    makeMove(numbers[randomIndex]);
  } else {
    const bestMove = minimax(board.value, "O");
    if (bestMove.index !== undefined && bestMove.index !== null) {
      makeMove(bestMove.index);
    }
  }
  statusPlay.value = false;
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

function newRound() {
  board.value = Array(9).fill(null);
  winner.value = null;
  roundPlayer.value = roundPlayer.value === "X" ? "O" : "X";
  if (currentPlayer.value === roundPlayer.value && roundPlayer.value === "O") {
    statusPlay.value = true;
    setTimeout(botMove, 700);
  }
  currentPlayer.value = roundPlayer.value;
}

function resetGame() {
  board.value = Array(9).fill(null);
  currentPlayer.value = roundPlayer.value;
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
    scoreX.value += 1;
  } else if (winner === "O") {
    winStack.value += 1;
    scoreO.value += 1;
  }
}

function logout() {
  const token = useCookie("token");
  token.value = "";
  router.push("/");
}
</script>
<template>
  <div class="d-flex flex-column gap-2">
    <div>
      <Logo></Logo>
    </div>
    <div class="text-center">
      <span class="me-3">TURN</span>
      <span
        class="h1 fw-bold"
        :class="currentPlayer === 'X' ? 'player-x' : 'player-o'"
        >{{ currentPlayer }}</span
      >
    </div>
    <div class="d-flex justify-content-center">
      <GameBoard :disabled="statusPlay">
        <template v-for="(cell, index) in board" :key="index">
          <button
            class="btn board-cell fs-1"
            :class="{
              'player-x': cell === 'X',
              'player-o': cell === 'O',
            }"
            @click="makeMove(index)"
          >
            {{ cell }}
          </button>
        </template>
        <GameBanner v-if="winner" :player="currentPlayer"
          >{{ winner }}
        </GameBanner>
      </GameBoard>
    </div>

    <div class="w-100 text-center h3">Score: {{ user.score }}</div>
    <div class="text-center">
      <div class="d-flex justify-content-center gap-3">
        <div>
          <button class="btn btn-primary" @click="resetGame">RESET</button>
        </div>
        <div>
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
