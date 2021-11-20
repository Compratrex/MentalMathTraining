const arrayActions = '+-';
let correctAnswer = 0;
let chossedId = 1;
let savedExpresions = [];

$('.startButton').click(function () {
    $('.startMenu').css('display', 'none');
    $('.game').css('display', 'block');
    chossedId = this.id;
    correctAnswer = genExpression($('.task'), chossedId);
});

const answerButtons = $('.answerButton');
let widthProgressBar = 0;

answerButtons.click(function () {
    if (this.id == correctAnswer) {
        savedExpresions[widthProgressBar / 15].isUserCorrect = true;
        savedExpresions[widthProgressBar / 15].Background = "#96E982";
        savedExpresions[widthProgressBar / 15].userAnswer = this.id;
    }
    if (this.id != correctAnswer) {
        savedExpresions[widthProgressBar / 15].isUserCorrect = false;
        savedExpresions[widthProgressBar / 15].Background = "#E99B82";
        savedExpresions[widthProgressBar / 15].userAnswer = this.id;
    }
    $(".progressStat").html(`You have completed ${widthProgressBar / 15 + 1}/20`)
    widthProgressBar += 15;
    if (widthProgressBar == 300) {
        $('.game').css('display', 'none');
        $('.statsMenu').css('display', 'block');
        console.log(savedExpresions);
        widthProgressBar = 300;
        $('.progressBar').css('width', widthProgressBar);
        genStats(savedExpresions);

    } else {
        $('.progressBar').css('width', widthProgressBar);
        correctAnswer = genExpression($('.task'), chossedId);
    }

});
$('img').click(function () {
    setNewGame();
});

function genExpression(jqObject, limit) {
    let expOne = getRandomNum(limit / 10, limit);
    let expTwo = getRandomNum(limit / 10, limit);
    let action = arrayActions[getRandomNum(0, 2)];
    jqObject.html(expOne + " " + action + " " + expTwo + " " + "= ?");
    switch (action) {
        case "+":
            correctAnswer = expOne + expTwo;
            break;
        case "-":
            correctAnswer = expOne - expTwo;
            break;
    }
    let expression = expOne + " " + action + " " + expTwo + " " + "= " + correctAnswer;
    let genCorrectButton = getRandomNum(0, 3);
    for (let i = 0; i < answerButtons.length; i++) {
        if (i === genCorrectButton) {
            answerButtons[i].innerHTML = correctAnswer;
            answerButtons[i].id = correctAnswer;
        } else {

            action = arrayActions[getRandomNum(0, 2)];
            switch (action) {
                case '+':
                    answerButtons[i].innerHTML = correctAnswer + getRandomNum(1, 9);
                    answerButtons[i].id = correctAnswer + getRandomNum(1, 9);
                    break;
                case '-':
                    answerButtons[i].innerHTML = correctAnswer + getRandomNum(1, 9);
                    answerButtons[i].id = correctAnswer + getRandomNum(1, 9);
                    break;
            }
        }
    }
    savedExpresions.push({Expression: expression, CorrectAnswer: correctAnswer})
    return correctAnswer;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function genStats(objectArray) {
    for (let i = 0; i < objectArray.length; i++) {
        $('.grid').append(`<div class="statElement" style="background-color: ${objectArray[i].Background};"> ${i + 1}) ${objectArray[i].Expression} <span class="correct">Yours: ${objectArray[i].userAnswer}</span></div>`);
        setTimeout(function () {
            $('.statElement')[i].style.opacity = "1";
        }, 100 * (i + 1));
    }
}

function setNewGame() {
    savedExpresions = [];
    $('.grid').html(" ");
    chossedId = 1;
    correctAnswer = 0;
    widthProgressBar = 0;
    $('.progressBar').css('width', widthProgressBar);
    $('.statsMenu').css('display', 'none');
    $('.startMenu').css('display', 'block');
}