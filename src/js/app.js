import Preface from "./Preface.js";

class HeatIgor {
  constructor() {
    this.text = 'Привет, дорогой друг! Сегодня, у тебя есть возможность надавть Игорю по щам! Игорь - весьма не приятная щеклея, вечно болтает по телефону, избегает работы, врет, изворачивается и все в таком духе. Давай накажем его! Напиши свое имя, и погнали!'
    this.Preface = new Preface(this.text);
    this.startBtn = document.querySelector('.start-btn');

    this.startGame();
  }

  startGame() {
    this.startBtn.addEventListener('click', () => {
      document.querySelector('.container').remove();

      this.Preface.renderPreface('play');
    })
  }
}

new HeatIgor();