const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const replayBtn = document.querySelector('.replay-btn');
const timer = document.querySelector('.timer');
const count = document.querySelector('.count');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__text');
const main = document.querySelector('.main');

let sec;
let carrotCount;
let test;

const audioBackground = new Audio('./sound/bg.mp3');
const audioCarrot = new Audio('./sound/carrot_pull.mp3');
const audioBug = new Audio('./sound/bug_pull.mp3');
const audioWon = new Audio('./sound/game_win.mp3');

main.addEventListener('click', (e) => {
    if (e.target.classList.contains('carrot')) {
        audioCarrot.play();
        --carrotCount;
        count.textContent = carrotCount;
        e.target.remove();
        if (carrotCount === 0) {
            gameOver('win');
        }
    } else if (e.target.classList.contains('bug')) {
        audioBug.play();
        gameOver();
    }
})

function createImages(name) {
    const x = Math.random() * (80 - 10) + 10;
    const y = Math.random() * (80 - 10) + 10;
    const img = document.createElement('img');
    img.setAttribute('src', `./img/${name}.png`);
    img.setAttribute('alt', `${name}`);
    img.classList.add('img-box', `${name}`);
    img.style.top = `${y}%`;
    img.style.left = `${x}%`;
    main.appendChild(img);
}

function gameSettings() {
    audioBackground.currentTime = 0;
    audioBackground.play();
    main.innerHTML = '';
    sec = 10;
    carrotCount = 10;
    count.textContent = carrotCount;
    printTimer();
    test = setInterval(setTimer, 1000);
    for (let i = 0; i < carrotCount; i++) {
        createImages('bug');
        createImages('carrot');
    }
}

replayBtn.addEventListener('click', () => {
    gameSettings();
    hideToggle(popUp, stopBtn);
})

playBtn.addEventListener('click', () => {
    gameSettings();
    hideToggle(playBtn, stopBtn);
})

stopBtn.addEventListener('click', () => {
    audioBackground.pause();
    main.innerHTML = '';
    clearInterval(test);
    hideToggle(stopBtn, playBtn);
})

function setTimer() {
    if (sec <= 0) {
        gameOver();
    } else {
        --sec;
        printTimer();
    }
}

function gameOver(result = 'lost') {
    audioBackground.pause();
    main.innerHTML = '';
    clearInterval(test);
    if (result === 'win') {
        popUpText.textContent = `YOU WON🎉`;
        audioWon.currentTime = 0;
        audioWon.play();
    } else {
        popUpText.textContent = `YOU LOST💩`;
    }
    hideToggle(popUp, stopBtn);
}

function printTimer() {
    timer.textContent = `00:${sec < 10 ? '0' + sec : sec}`;
}

function hideToggle(...elemet) {
    elemet.forEach(item => item.classList.toggle('hide'));
}