var scoreup = 0;
class MemoryGame {

  constructor() {
    this.duration = 1000;
    this.cardsContainer = document.querySelector('.js-cards');
    this.cards = Array.from(this.cardsContainer.children);
  }

  shuffleCards() {
    this.cards.forEach(card => {
      const randomNumber = Math.floor(Math.random() * this.cards.length) + 1;

      card.classList.remove('has-match');

      setTimeout(() => {
        card.style.order = `${randomNumber}`;
      }, 400);
    })
  }

  checkAllCards() {
    if (!this.cards.every(card => card.classList.contains('has-match'))) return;

    setTimeout(() => {
      this.shuffleCards();
    }, this.duration);
  }

  stopEvent() {
    this.cardsContainer.classList.add('no-event');

    setTimeout(() => {
      this.cardsContainer.classList.remove('no-event');
    }, this.duration);
  }

  checkIfMatch([firstCard, secondCard]) {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');

      firstCard.classList.add('has-match');
      secondCard.classList.add('has-match');
      scoreup = scoreup+5;
      document.getElementById("score").innerHTML = scoreup;

      this.checkAllCards();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
      }, this.duration);
    }
  }

  flip(selectedCard) {
    selectedCard.classList.add('flipped');

    const flippedCards = this.cards.filter(card => card.classList.contains('flipped'));

    if (flippedCards.length === 2) {
      this.stopEvent();
      this.checkIfMatch(flippedCards);
    }
  }

}

const game = new MemoryGame;

game.cards.forEach(card => {
  card.addEventListener('click', game.flip.bind(game, card));
})

window.onload = init();
function init() {
  Swal.fire({
    icon: "question",
    title: 'Will you play this game with your name?',
    // text: "You won't be able to revert this!",
    showCancelButton: true,
    cancelButtonColor: '#3085d6',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, play it!',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      //Entering name
swal("Enter your name:", {
  content: "input",
})
.then((name) => {
  //swal(`You typed: ${value}`);
  var uname = document.getElementById("plname");
          if (name != "") {
            uname.innerHTML = name;
          } else {
            uname.innerHTML = "Player"
          }
          Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Name Added',
  showConfirmButton: false,
  timer: 1500
})
          timer();
});
        
    } else {
      let timerInterval
      Swal.fire({
        title: 'Ok Fine',
        html: 'We are setting your name as player.',
        timer: 1800,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          },
            100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      document.getElementById("plname").innerHTML = "Player";
      timer();
    }

  })


}


function timer () {
  var fs = 0;
  var ss = 0;
  var fm = 0;
  var sm = 0;
  var fh = 0;
  var sh = 0;
  var tfs = document.getElementById("fs");
  var tss = document.getElementById("ss");
  var tfm = document.getElementById("fm");
  var tsm = document.getElementById("sm");
  var tfh = document.getElementById("fh");
  var tsh = document.getElementById("sh");
  tfh.innerHTML = fh;
  tsh.innerHTML = sh;
  tfm.innerHTML = fm;
  tsm.innerHTML = sm;
  tfs.innerHTML = fs;
  tss.innerHTML = ss;
  setInterval(function() {
    ss++;
    if (ss >= 10) {
      ss = 0;
      fs++;
      if (fs >= 6) {
        fs = 0;
        sm++;
        if (sm >= 10) {
          sm = 0;
          fm++;
          if (fm >= 6) {
            fm = 0;
            sh++;
            if (sh >= 10) {
              sh = 0;
              fh++;
              tfh.innerHTML = fh;
              tsh.innerHTML = sh;
            } else {
              tsh.innerHTML = sh;
            }
            tfm.innerHTML = fm;
          } else {
            tfm.innerHTML = fm;
          }
          tsm.innerHTML = sm;
        } else {
          tsm.innerHTML = sm;
        }
        tfs.innerHTML = fs;
      } else {
        tfs.innerHTML = fs;
      }

      tss.innerHTML = ss;

    } else {
      tss.innerHTML = ss;
    }

  },
    1000);

}