const leftScissors = document.querySelector('.left-scissors');
const rightScissors = document.querySelector('.right-scissors');
const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {
    let angle = 10; // 초기 각도
    let direction = 1; // 회전 방향
    let iterations = 0; // 반복 횟수

    const interval = setInterval(() => {
        if (iterations >= 6) { // 애니메이션 반복 횟수 설정
            clearInterval(interval);
            leftScissors.style.transform = 'rotate(0deg)';
            rightScissors.style.transform = 'rotate(0deg)';
        } else {
            leftScissors.style.transform = `rotate(${angle * direction}deg)`;
            rightScissors.style.transform = `rotate(${-angle * direction}deg)`;
            direction *= -1; // 방향을 반전
            iterations++;
        }
    }, 200); // 각 애니메이션 단계의 지속 시간
});
