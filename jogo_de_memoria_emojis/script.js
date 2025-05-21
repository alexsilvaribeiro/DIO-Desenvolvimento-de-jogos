const emojis = [
    "😸",
    "😸",
    "🦝",
    "🦝",
    "🦊",
    "🦊",
    "🐶",
    "🐶",
    "🐵",
    "🐵",
    "🐮",
    "🐮"
];

/*----------------------------------------------------------------*/
// Cria o elemento de contagem de movimentos

let movimentos = 0;

const placarElemento = document.getElementById("score");



/*----------------------------------------------------------------*/
// Cria o elemento de contagem regressiva
let segundos = 0;

const timeLeft = document.getElementById("time-left");

// Atualiza o tempo a cada segundo

let intervalo = setInterval(() => {
    segundos++;
    timeLeft.textContent = segundos;
}, 1000);
/*-------------------------------------------------------------------*/


    
let openCards = [];

let shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);

for (let i = 0; i < emojis.length; i++) {
    // Cria um elemento div para cada emoji
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffledEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick(event) {
    if (jogoFinalizado) return;
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
        playSound('open-card');

        movimentos++; // incrementa o contador

        placarElemento.textContent = movimentos; // atualiza o placar visual

        if (openCards.length === 2) {
            setTimeout(checkMatch, 1000);
            
        }
    }
}

let jogoFinalizado=false;

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];
    
    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        jogoFinalizado = true;
        playSound('fim-de-jogo');
        alert(`Parabéns! Você ganhou em ${segundos} segundos e ${movimentos} movimentos!`);
        clearInterval(intervalo); // Para o cronômetro
        

        
    }
}

function playSound(audioName) {
  let audio = new Audio(`./audios/${audioName}.mp3`);
  audio.currentTime = 0; 
  audio.volume = 0.2;       // volume do áudio
  audio.play().catch(console.warn); //sempre que o áudio seja reproduzido ao clicar no quadrado
}