

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle('hide'));
}

const pianoKeys = document.querySelectorAll('.piano-keys .key');

let mapedKeys = []; //Vetor para mapear as teclas do piano

/*--------------Controle de Volume----------------*/


const volumeSlider = document.querySelector('.volume-slider input');

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

volumeSlider.addEventListener('input', handleVolume);

/*--------------Funcionalidade de ocultar as teclas-----*/

const keysCheck = document.querySelector('.keys-check input');

keysCheck.addEventListener("click", showHideKeys);





/*--------------Adicionando aúdio as teclas---------*/


let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
    const audio = new Audio(`src/tunes/${key}.wav`);
    audio.volume = volumeSlider.value;
    audio.play();

    const clickedKey = document.querySelector(`.key[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add('active');
        setTimeout(() => {
            clickedKey.classList.remove('active');
        }, 150);
    }
};


pianoKeys.forEach((key) => {
  console.log(key.dataset.key);
  key.addEventListener('click', () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});


/*--------------Adicionando funcionalidade no teclado----------------*/

document.addEventListener('keydown', (e) => {
    if (mapedKeys.includes(e.key)) {
    playTune(e.key);
}
});


