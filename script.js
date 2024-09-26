const leftScissors = document.querySelector('.left-scissors');
const rightScissors = document.querySelector('.right-scissors');
const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {
    leftScissors.style.transform = 'rotate(-10deg)';
    rightScissors.style.transform = 'rotate(10deg)';

    setTimeout(() => {
        leftScissors.style.transform = 'rotate(10deg)';
        rightScissors.style.transform = 'rotate(-10deg)';
    }, 300);

    setTimeout(() => {
        leftScissors.style.transform = 'rotate(0)';
        rightScissors.style.transform = 'rotate(0)';
    }, 600);
});
