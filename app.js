var roundScore, scores, activePlayer, doubleSix, gamePlaying;

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    doubleSix = 0;
    gamePlaying = true;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.final-score').value = '';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').readOnly = false;
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        if (dice1 !== 1 && dice2 !== 1) {
            document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            (dice1 === 6 || dice2 === 6) ? doubleSix++ : doubleSix = 0;
            if (doubleSix === 2) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = 0;
                nextPlayer();
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        var scoreLimit = document.querySelector('.final-score').value;
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (!scoreLimit) {
            scoreLimit = 100;
            document.querySelector('.final-score').value = scoreLimit;
        }
        document.querySelector('.final-score').readOnly = true;
        if (scores[activePlayer] >= scoreLimit) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    doubleSix = 0;
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}