alert("Please turn off Telex before playing");

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio("../../assets/tunes/a.wav") // default src is a

const playTune = (key) => {
    audio.src = `../../assets/tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active")
    }, 150);
};

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const pressedKey = (e) => {
    if(allKeys.includes(e.key)) {
        playTune(e.key)
    }
}

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = (e) => {
    pianoKeys.forEach(key => {
        key.classList.toggle('hidden');
    });
}

const showHideKeysByBtn = (e) => {
    if (e.key === 'r' || e.key === 'R') {
        if (keysCheckbox.checked === false) {
            keysCheckbox.setAttribute('checked', true);
            pianoKeys.forEach(key => {
                key.classList.remove('hidden');
            });  
        } else {
            keysCheckbox.removeAttribute('checked');
            pianoKeys.forEach(key => {
                key.classList.add('hidden');
            });  
        }
    }
}

document.addEventListener("keydown", pressedKey);
document.addEventListener("keydown", showHideKeysByBtn);
volumeSlider.addEventListener("input", handleVolume);
keysCheckbox.addEventListener("click", showHideKeys);
