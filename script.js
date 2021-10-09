const screens = document.querySelectorAll('.screen');
const choose_predator_btns = document.querySelectorAll('.choose-predator-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_predator = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_predator_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_predator = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createPredator, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createPredator() {
    const predator = document.createElement('div')
    predator.classList.add('predator')
    const { x, y } = getRandomLocation()
    predator.style.top = `${y}px`
    predator.style.left = `${x}px`
    predator.innerHTML = `<img src="${selected_predator.src}" alt="${selected_predator.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    predator.addEventListener('click', catchPredator)

    game_container.appendChild(predator)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchPredator() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addPredator()
}

function addPredator() {
    setTimeout(createPredator, 1000)
    setTimeout(createPredator, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}