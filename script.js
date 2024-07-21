'use strict';
//A helpful way of planning a project can be by visualizing the project with a flowchart. (You can use diagram.net to do so)
//A way to call an ID instead of using the hashtag, is by using getElementById instead of using querySelector.
//To change the source of an image, we use the src method, write an equal sign, and in a string write the name of the new image we want to display, and if the image depends on an outcome, you can write the name as a template literal as seen in the Dice event in part 2.
//A method that is part of the classList method is the toggle mehtod, which will add or remove a class if it is or isn't there. If the class we select is there, the toggle method will remove the class, and if the class isn't there, the toggle method will add that class.
//Something common in programming is having a variable that determines whether something happens or not, like in the case of the variable playing that you can see below, thic variable determines whether the buttons will work or not, and if the game is playing, the buttons will work but if not, then they won't work.
//Declaring variables inside a function causes the variables declared to no be accesible later on, so the variables have to be defined outside the function but with no value, not adding anything, see below to see what it means to declare them with no value.

//Selecting Elements
const score0El = document.getElementById('score--0');
const player0El = document.querySelector('.player--0');
const player0ScoreEl = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');

const score1El = document.getElementById('score--1');
const player1El = document.querySelector('.player--1');
const player1ScoreEl = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting Conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchActivePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Rolling the dice
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2. Displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    //3. Check for 1
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', init);
