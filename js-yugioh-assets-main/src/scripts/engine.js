const state = {
  score:{
    playerScore:0,
    computerScore:0,
    scoreBox: document.getElementById('score_points'),

  },
  cardSprites: {
    avatar: document.getElementById('card-image'),
    name: document.getElementById('card-name'),
    type: document.getElementById('card-type'),
  },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector('#player-cards'),
        computer: "computer-cards",
        computerBOX: document.querySelector('#computer-cards'),
    },
    actions:{
        button: document.getElementById('next-duel'),
    },
};



const cardData =[
    {
        id: 0,
        name: "Dragão branco de Olhos Azuis",
        type: "Papel",
        img: "./src/assets/icons/dragon.png",
        winOf:[1,4],
        loseOf:[2,5],
    },
    {
        id: 1,
        name: "Mago negro",
        type: "Pedra",
        img: "./src/assets/icons/magician.png",
        winOf:[2,5],
        loseOf:[0,3],
    },
    {
        id: 2,
        name: "Exodia",
        type: "tesoura",
        img: "./src/assets/icons/exodia.png",
        winOf:[0,3],
        loseOf:[1,4],
    },
    {
        id: 3,
        name: "Dragrão negro de Olhos Vermelhos",
        type: "Papel",
        img: "./src/assets/icons/red-eyes.jpeg",
        winOf:[1,4],
        loseOf:[2,5],
    },
    {
        id: 4,
        name: "Paladino das Trevas",
        type: "Pedra",
        img: "./src/assets/icons/dark-paladin.jpeg",
        winOf:[2,5],
        loseOf:[0,3],
    },
    {
        id: 5,
        name: "Dragão Supremo de Olhos Azuis",
        type: "Tesoura",
        img: "./src/assets/icons/ultimate-dragon.jpeg",
        winOf:[0,3],
        loseOf:[1,4],
    },
]

// Função para sortear um id do vetor cardData
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function getCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
        cardImage.addEventListener('mouseover', () => {
            drawSelectorCard(idCard);
        });
    }


    return cardImage;

}

async function setCardsField(cardId) {

    //Remove todas as imagens de cartas do campo
    await removeAllCardsImages();
    
    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImages(true);

    await hiddenCardDetails();

    await drawCardsInFielfield(cardId, computerCardId);
    
    let duelResult = await checkduelResults(cardId, computerCardId);

    await updateScore();

    await drawButton(duelResult);
}

async function drawCardsInFielfield(cardId, computerCardId) {
    // Atualiza as imagens das cartas no campo
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value) {
    if(value=== true){ 
    
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
}

    if(value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";

}
}

async function hiddenCardDetails() {

    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function drawButton(text) {

    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";

}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkduelResults(playerCardId, computerCardId) {
    let duelResult = "Empate";
    let playerCard = cardData[playerCardId];
    let computerCard = cardData[computerCardId];

    if (playerCard.winOf.includes(computerCardId)) {
        await playAudio("win");
        duelResult = "Ganhou";
        state.score.playerScore++;
    }

    if (playerCard.loseOf.includes(computerCardId)) {
        await playAudio("lose");
        duelResult = "Perdeu";
        state.score.computerScore++;
    }

    return duelResult;
}

async function removeAllCardsImages(){
    // Remove todas as imagens de cartas do campo
      
    let cards = state.playerSides.computerBOX;
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = state.playerSides.player1BOX;
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
    
}

async function drawSelectorCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute: " + cardData[index].type;

}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await getCardImage(randomIdCard,fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
}




}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
    audio.addEventListener('ended', () => {
        audio.remove();
    });
    
}




function init(){
    showHiddenCardFieldsImages(false);


    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById('bgm');
    bgm.volume = 0.1;
    bgm.play();


}

init();