import Preface from "./Preface.js";

export default class Game {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.igorsRun = null;
        this.hitCounter = 0;
        this.text = 'Ну вот! Игорь наказан! Он обещает измениться и стать лучше! Молодец, дорогой друг! А теперь хули ты тут в телефоне тыкаешься иди работай давай!!!';
        this.Preface = new Preface(this.text);
        this.igorStep1 = '<div class="igor-step-1"></div>';
        this.igorStep2 = '<div class="igor-step-2"></div>';
        this.igorStep3 = '<div class="igor-step-3"></div>';
        this.igorStep4 = '<div class="igor-step-4"></div>';
        this.renderGameField();
        this.nul = null;
    }

    renderGameField() {
        this.html = `<div class="game">
        <div class="user-and-score">
            <span class="user-name">Павел</span>
            <span class="score">0</span>
        </div>

        <div class="gameField">
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
            <div class="gameField__item"></div>
        </div>
    </div>`

        this.app.insertAdjacentHTML('beforeend', this.html);

        this.cells = Array.from(this.app.querySelectorAll('.gameField__item'));

        this.user = this.app.querySelector('.user-name');
        this.score = this.app.querySelector('.score');
        this.user.textContent = this.name;

        this.player = new Audio('../sounds/benny.mp3');
        this.player.volume = 0.2;

        this.player.addEventListener('ended', () => {
            this.player.currentTime = 0;
            this.player.play();
        })

        this.hitIgor(this.igorStep1, 'igor-step-1');
    }

    startGame(igor, igorClass, speed) {
        this.player.play();
        this.cells[0].innerHTML = igor;
        
        this.igorsRun = setInterval(() => {
            let cellItem = Math.floor(Math.random() * (9 - 0) + 0);
            document.querySelector(`.${igorClass}`).remove();
            this.cells[cellItem].innerHTML = igor;
        }, speed);
    }

    hitIgor(igor, igorClass) {
        this.startGame(igor, igorClass, 500);

        this.gameField = this.app.querySelector('.gameField');
        this.score.textContent = this.hitCounter;

        this.gameField.addEventListener('click', e => {
            if(
                e.target.classList.contains('igor-step-1') ||
                e.target.classList.contains('igor-step-2') ||
                e.target.classList.contains('igor-step-3')
            ) {
                if(this.hitCounter === 9) {
                    console.log('Функция где игорь просит о помощи');
                    clearInterval(this.igorsRun);
                    document.querySelector(`.igor-step-1`).remove();
                    this.igorAsksForHelp('Посоны не бейти a, лутше абассссыти!!!', 450, 'igor-step-2', this.igorStep2, 'step-2.png', 'play');
                    this.hitCounter = 10;
                    this.score.textContent = this.hitCounter;
                    return;
                } ;
                
                if(this.hitCounter === 19) {
                    console.log('3ий уровень');
                    clearInterval(this.igorsRun);
                    document.querySelector('.igor-step-2').remove();
                    this.igorAsksForHelp('У сука! Ща так побегу...', 400, 'igor-step-3', this.igorStep3, 'step-3.png', 'play');
                    this.hitCounter = 20;
                    this.score.textContent = this.hitCounter;
                    return;
                };

                if(this.hitCounter === 24) {
                    clearInterval(this.igorsRun);
                    document.querySelector(`.game`).remove();
                    this.igorAsksForHelp('Аааааа.... блэть!!! Больно сцуко!!!', 300, 'igor-step-4', this.igorStep4, 'step-4.png', 'over');
                    // this.player.pause();

                    return;
                }

                this.hitCounter += 1;
                this.score.textContent = this.hitCounter;
                this.punchVoice();
            }
        })
    }

    punchVoice() {
        this.PunchPlayer = new Audio('../sounds/punch.mp3');
        this.PunchPlayer.volume = 1;
        this.PunchPlayer.play();
    }

    igorAsksForHelp(text, speed, igorClass, igorFace, igorImage, tag) {
        this.player.pause();

        const html = `<div class="igor-help">
        <div class="igor-help__text-box">
            <span class="text-box__text"></span>
        </div>

        <div class="igor-help__box">
            <img src="./images/${igorImage}" class="igor-help__img">
        </div>
     </div>`;

        this.app.insertAdjacentHTML('afterbegin', html);

        const igorsCryPlayer = new Audio('../sounds/game-over.mp3');
        igorsCryPlayer.play();

        igorsCryPlayer.addEventListener('ended', () => {
            igorsCryPlayer.currentTime = 0;
            igorsCryPlayer.play();
        });

        this.textBox = this.app.querySelector('.text-box__text');

        const textForHelp = Array.from(text);

        let i = 0;
        const interval = setInterval(() => {
            if(this.textBox.textContent.length === textForHelp.length) {
                clearInterval(interval);

                setTimeout(() => {
                    document.querySelector('.igor-help').remove();
                    igorsCryPlayer.pause();

                    if(tag === 'over') {
                        clearInterval(interval);
                        this.player.pause();
                        this.Preface.renderPreface('over');
                        return;
                    }
                    this.startGame(igorFace, igorClass, speed);
                }, 3000)
                return;
            }

            this.textBox.textContent += textForHelp[i];
            i++;
        }, 200)
    }
}