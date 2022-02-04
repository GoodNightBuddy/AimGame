const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('.time-left')
const board = document.querySelector('.board')
// let restartBtn = document.querySelector('.restart')
let restartBtn
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
let interval
let score = 0
let time = 0


startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('time-btn')) {
        time = +e.target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame(time)
    }
    screens[0].classList.add('up')
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})



function startGame() {
    board.innerHTML = ''
    if (timeEl.parentNode.classList.contains('hide'))timeEl.parentNode.classList.remove('hide')
    interval = setInterval (decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
    

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    const size = getRandomNumber(25, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const circle = document.createElement('div')
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${colors[getRandomNumber(0, colors.length - 1)]}`
    

    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

function finishGame() {
    clearInterval(interval)
    board.innerHTML = `<h1>You score: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')

    restartBtn = document.createElement('a')
    restartBtn.innerHTML = 'Try again'
    restartBtn.classList.add('start')
    restartBtn.style.cursor = 'pointer'
    restartBtn.addEventListener('click', () => {
        screens[1].classList.remove('up')
        score = 0
    })
    board.append(restartBtn)

}

function winTheGame(time) {
    function killCircle () {
        let circle = document.querySelector('.circle')
        if(circle) {
            circle.click()
        }
    }

    setInterval(killCircle, time)
}











