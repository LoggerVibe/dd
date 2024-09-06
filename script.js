document.getElementById('play-button').addEventListener('click', function() {
    const randomNumber = Math.random();
    const resultElement = document.getElementById('result');

    if (randomNumber < 0.5) {
        resultElement.textContent = '당신이 승리했습니다!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = '당신이 패배했습니다.';
        resultElement.style.color = 'red';
    }
});
