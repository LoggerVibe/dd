// 상태 변수 설정
let day = 1;
let health = 100;
let food = 50;
let money = 0;
let momSupport = 0; // 엄마 자원 (지원 불가능 상태로 설정)

// UI 업데이트 함수
function updateUI() {
    document.getElementById('day').textContent = `Day: ${day}`;
    document.getElementById('health').textContent = `Health: ${health}`;
    document.getElementById('food').textContent = `Food: ${food}`;
    document.getElementById('money').textContent = `Money: ${money}`;
    document.getElementById('mom').textContent = `Mom's Support: ${momSupport}`; // 엄마 자원 (항상 0으로 유지)
}

// 음식을 찾는 함수
function searchForFood() {
    let foodFound = Math.floor(Math.random() * 20) + 1;
    food += foodFound;
    health -= 5;
    day++;
    checkGameOver();
    updateUI();
    alert(`You found ${foodFound} units of food!`);
}

// 일을 찾는 함수
function findJob() {
    let moneyEarned = Math.floor(Math.random() * 30) + 5;
    money += moneyEarned;
    food -= 10;
    health -= 10;
    day++;
    checkGameOver();
    updateUI();
    alert(`You earned ${moneyEarned} money!`);
}

// 휴식을 취하는 함수
function rest() {
    health += 20;
    food -= 5;
    day++;
    checkGameOver();
    updateUI();
    alert("You rested and regained health.");
}

// 엄마에게 도움 요청하는 함수 (지원 불가)
function askMomForHelp() {
    alert("애미가 없어서 그럴 수 없었다..!"); // 도움 불가능 메시지 출력
    day++;
    updateUI();
}

// 게임 종료 체크 함수
function checkGameOver() {
    if (health <= 0 || food <= 0) {
        alert("Game Over. You didn't survive.");
        resetGame();
    }
}

// 게임 리셋 함수
function resetGame() {
    day = 1;
    health = 100;
    food = 50;
    money = 0;
    momSupport = 0;
    updateUI();
}

// 초기 상태 업데이트
updateUI();
