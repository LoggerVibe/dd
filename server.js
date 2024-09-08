const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

// MySQL 연결
connection.connect();

// 회원가입 API
app.post('/signup', (req, res) => {
  const { username, email } = req.body;
  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
  
  connection.query(sql, [username, email], (err, result) => {
    if (err) {
      res.json({ success: false, message: '회원가입 실패' });
    } else {
      res.json({ success: true });
    }
  });
});

// 로그인 API
app.post('/login', (req, res) => {
  const { username } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  
  connection.query(sql, [username], (err, results) => {
    if (err || results.length === 0) {
      res.json({ success: false, message: '로그인 실패' });
    } else {
      res.json({ success: true
      res.json({
        success: true,
        balance: results[0].balance
      });
    }
  });
});

// 룰렛 게임 API
app.post('/play-roulette', (req, res) => {
  const { betAmount } = req.body;
  const outcomes = [
    { name: '무현운지', chance: 0.10, multiplier: 0 },
    { name: '반띵', chance: 0.20, multiplier: 0.5 },
    { name: '본전', chance: 0.20, multiplier: 1 },
    { name: '이득', chance: 0.30, multiplier: 1.5 },
    { name: '애매', chance: 0.10, multiplier: 1.2 },
    { name: '애매2', chance: 0.10, multiplier: 0.8 }
  ];

  const random = Math.random();
  let sum = 0;
  let result = {};

  for (let outcome of outcomes) {
    sum += outcome.chance;
    if (random <= sum) {
      result = outcome;
      break;
    }
  }

  const winnings = Math.floor(betAmount * result.multiplier);
  res.json({ success: true, result: result.name, newBalance: winnings });
});

// 주사위 게임 API
app.post('/play-dice', (req, res) => {
  const { betAmount, chosenNumber1, chosenNumber2 } = req.body;
  const randomNum1 = Math.floor(Math.random() * 8) + 1;
  const randomNum2 = Math.floor(Math.random() * 8) + 1;

  let result = '';
  let winnings = 0;

  if ((randomNum1 == chosenNumber1 && randomNum2 == chosenNumber2) || 
      (randomNum1 == chosenNumber2 && randomNum2 == chosenNumber1)) {
    result = '두 숫자 모두 일치';
    winnings = Math.floor(betAmount * 1.5);
  } else if (randomNum1 == chosenNumber1 || randomNum2 == chosenNumber2 || 
             randomNum1 == chosenNumber2 || randomNum2 == chosenNumber1) {
    result = '한 숫자만 일치';
    winnings = Math.floor(betAmount * 1.2);
  } else {
    result = '숫자가 일치하지 않음';
    winnings = Math.floor(betAmount * 0.8);
  }

  res.json({ success: true, result, newBalance: winnings });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});
