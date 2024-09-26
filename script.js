const leftScissors = document.querySelector('.left-scissors');
const rightScissors = document.querySelector('.right-scissors');
const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {
    leftScissors.style.transform = 'rotate(-30deg)';
    rightScissors.style.transform = 'rotate(30deg)';

    setTimeout(() => {
        leftScissors.style.transform = 'rotate(30deg)';
        rightScissors.style.transform = 'rotate(-30deg)';
    }, 200);

    setTimeout(() => {
        leftScissors.style.transform = 'rotate(-20deg)';
        rightScissors.style.transform = 'rotate(20deg)';
    }, 400);

    setTimeout(() => {
        leftScissors.style.transform = 'rotate(20deg)';
        rightScissors.style.transform = 'rotate(-20deg)';
    }, 600);

    setTimeout(() => {
        leftScissors.style.transform = 'rotate(0)';
        rightScissors.style.transform = 'rotate(0)';
    }, 800);
});
