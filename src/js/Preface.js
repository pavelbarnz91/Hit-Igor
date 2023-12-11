import Game from "./Game.js";

export default class Preface {
    constructor(text) {
        this.app = document.querySelector('.app');
        this.text = Array.from(text);
    }

    renderPreface(tag) {
        const html = `<div class="preface">
        <div class="preface__text-box">
                <span class="text-box__text"></span>
                <div class="youname-box hidden">
                    <input type="text" class="youname" autofocus>
                    <div class="enter-youname"></div>
                </div>
        </div>

        <div class="avtor-box">
            <img src="./images/avtor.png" class="avtor">
        </div>
    </div>`

        this.app.insertAdjacentHTML('beforeend', html);

        this.audio();
        this.printText(tag);
    }

    printText(tag) {
        this.textBox = this.app.querySelector('.text-box__text');

        let i = 0;
        const interval = setInterval(() => {
            if(this.textBox.textContent.length === this.text.length) {
                clearInterval(interval);
                this.youNameBox = this.app.querySelector('.youname-box');
                if(tag === 'over') return;
                this.youNameBox.classList.remove('hidden');
                this.enterName();
                return;
            }

            this.textBox.textContent += this.text[i];
            i++;
        }, 50)
    }

    enterName() {
        this.youName = this.app.querySelector('.youname');
        this.enterNameBtn = this.app.querySelector('.enter-youname');

        this.enterNameBtn.addEventListener('click', () => {
            if(this.youName.length === 0) return;
            this.name = this.youName.value;
            this.name = this.name.toUpperCase();

            if(this.name === 'ИГОРЬ' || this.name === 'IGOR') {
                alert('Игорь!!! Иди работай! Какие игры? Ты заявку написал?! Работать!!!');
            } else {
                this.player.pause();
                this.app.querySelector('.preface').remove();
                new Game(this.app, this.name);
            }
        })
    }

    audio() {
        this.player = new Audio('../sounds/circus.mp3');
        this.player.play();
    }
}