// Estado global da aplicação
const state = {
  view: {
    squares: document.querySelectorAll('.square'),    // Lista de todos os quadrados do tabuleiro
    timeLeft: document.querySelector('#time-left'),   // Elemento que mostra o tempo restante
    score: document.querySelector('#score'),        // Elemento que mostra a pontuação
    lives: document.querySelector('#live'),         // Lista de vidas restantes
    restartButton: document.querySelector('#restart') // Botão para reiniciar o jogo
  },
  values: {
    gameVelocity: 1000,   // Intervalo (ms) entre aparições do inimigo
    hitPosition: null,    // ID do quadrado onde o inimigo está
    result: 0,            // Pontuação atual do jogador
    currentTime: 10       // Tempo restante em segundos
    
  },
  actions: {
    timerId: null,           // ID do setInterval de randomSquare
    countDownTimerId: null   // ID do setInterval de countDown
  }
};


function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.currentTime = 0; 
  audio.volume = 0.2;       // volume do áudio
  audio.play().catch(console.warn); //sempre que o áudio seja reproduzido ao clicar no quadrado
}

/**
 * randomSquare()
 * - Remove a classe 'enemy' de todos os quadrados.
 * - Seleciona aleatoriamente um quadrado e adiciona a classe 'enemy'.
 * - Atualiza state.values.hitPosition com o ID desse quadrado.
 */
function randomSquare() {
  state.view.squares.forEach(sq => sq.classList.remove('enemy'));
  const randIndex = Math.floor(Math.random() * state.view.squares.length);
  const sq = state.view.squares[randIndex];
  sq.classList.add('enemy');
  state.values.hitPosition = sq.id;
}

/**
 * countDown()
 * - Decrementa state.values.currentTime a cada segundo.
 * - Atualiza o texto de tempo na tela.
 * - Se o tempo chegar a zero, para ambos os timers e exibe alerta de "Game Over".
 */
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    alert('Game Over! Seu placar foi ' + state.values.result);
  }
}

/**
 * startGame()
 * - Garante que não haja timers antigos ativos.
 * - Inicia:
 *    • randomSquare() em loop de acordo com gameVelocity.
 *    • countDown() a cada segundo.
 */
function startGame() {
  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDownTimerId);

  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

/**
 * restartGame()
 * - Reseta pontuação e tempo aos valores iniciais.
 * - Remove qualquer 'enemy' residual.
 * - Chama startGame() para reiniciar os timers.
 */
function restartGame() {
  state.values.result = 0;
  state.values.currentTime = 10;
  state.view.lives.textContent = 3;
  state.view.score.textContent = 0;
  state.view.timeLeft.textContent = 10;
  state.view.squares.forEach(sq => sq.classList.remove('enemy'));
  startGame();
}

/**
 * addListenerHitBox()
 * - Adiciona listener de 'mousedown' a cada quadrado.
 * - Se o quadrado clicado tiver o ID igual a hitPosition:
 *    • Incrementa a pontuação.
 *    • Atualiza o display de score.
 *    • Remove a classe 'enemy'.
 */
function addListenerHitBox() {
  state.view.squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('hit');
        //square.classList.remove('enemy');
      }else {
        state.view.lives.textContent--;
        playSound('erro');
        if (state.view.lives.textContent == 0) {
            playSound('game-over');
          alert('Game Over! Seu placar foi ' + state.values.result);
          clearInterval(state.actions.timerId);
          clearInterval(state.actions.countDownTimerId);
        }
      }
    });
  });
}

/**
 * initialize()
 * - Ponto de entrada do jogo.
 * - Configura listeners de clique nos quadrados e no botão de reiniciar.
 * - Inicia o jogo chamando startGame().
 */
function initialize() {
  addListenerHitBox();
  state.view.restartButton.addEventListener('click', restartGame);
  startGame();
}

// Inicia tudo ao carregar o script
initialize();
