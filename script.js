// 서버와 통신을 위한 기본 설정
const baseUrl = 'http://localhost:3000';  // 서버 주소

// 회원가입 이벤트
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('회원가입 성공!');
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
      } else {
        alert('회원가입 실패: ' + data.message);
      }
    });
});

// 로그인 이벤트
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('로그인 성공!');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('balance').textContent = data.balance;
      } else {
        alert('로그인 실패: ' + data.message);
      }
    });
});

// 룰렛 게임 이벤트
document.getElementById('play-roulette').addEventListener('click', function () {
  const betAmount = document.getElementById('bet-amount').value;

  fetch(`${baseUrl}/play-roulette`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ betAmount })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('룰렛 결과: ' + data.result);
        document.getElementById('balance').textContent = data.newBalance;
      } else {
        alert('게임 실패: ' + data.message);
      }
    });
});

// 주사위 게임 이벤트
document.getElementById('play-dice').addEventListener('click', function () {
  const betAmount = document.getElementById('dice-bet').value;
  const chosenNumber1 = document.getElementById('chosen-number1').value;
  const chosenNumber2 = document.getElementById('chosen-number2').value;

  fetch(`${baseUrl}/play-dice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ betAmount, chosenNumber1, chosenNumber2 })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('주사위 결과: ' + data.result);
        document.getElementById('balance').textContent = data.newBalance;
      } else {
        alert('게임 실패: ' + data.message);
      }
    });
});
