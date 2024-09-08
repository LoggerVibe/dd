const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3306;

app.use(bodyParser.json());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mysql'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL 연결 성공, 연결 ID:', connection.threadId);
});

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
    { name: '무현운지', chance: 0.07, multiplier: 0 },
    { name: '반띵', chance: 0.20, multiplier: 0.5 },
    { name: '본전', chance: 0.40, multiplier: 1 },
    { name: '야~ 기분좋다', chance: 0.03, multiplier: 2 },
    { name: '코알라가 덮쳐온다?!?!', chance: 0.30, multiplier: 1.2 }
  ];
  
  const rand = Math.random();
  let outcome;
  let cumulativeChance = 0;

  for (let i = 0; i < outcomes.length; i++) {
    cumulativeChance += outcomes[i].chance;
    if (rand < cumulativeChance) {
      outcome = outcomes[i];
      break;
    }
  }

  const sql = 'UPDATE users SET balance = balance + ? WHERE username = ?';
  connection.query(sql, [betAmount * outcome.multiplier, req.body.username], (err, result) => {
    if (err) {
      res.json({ success: false, message: '게임 실패' });
    } else {
      res.json({
        success: true,
        result: outcome.name,
        newBalance: result[0].balance
      });
    }
  });
});

// 주사위 게임 API
app.post('/play-dice', (req, res) => {
  const { betAmount, chosenNumber1, chosenNumber2 } = req.body;
  const diceRoll = Math.floor(Math.random() * 6) + 1;

  const win = chosenNumber1 == diceRoll || chosenNumber2 == diceRoll;
  const winnings = win ? betAmount * 2 : -betAmount;

  const sql = 'UPDATE users SET balance = balance + ? WHERE username = ?';
  connection.query(sql, [winnings, req.body.username], (err, result) => {
    if (err) {
      res.json({ success: false, message: '게임 실패' });
    } else {
      res.json({
        success: true,
        result: `주사위 결과: ${diceRoll}`,
        newBalance: result[0].balance
      });
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
