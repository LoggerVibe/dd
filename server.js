const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// 데이터베이스 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL 연결 성공');
});

app.use(bodyParser.json());
app.use(cors());

// 회원가입
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const userIP = req.ip;

    db.query('SELECT * FROM users WHERE ip = ?', [userIP], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.json({ message: '해당 IP에서는 이미 계정이 생성되었습니다.' });
        }

        db.query('INSERT INTO users (username, password, ip) VALUES (?, ?, ?)', [username, password, userIP], (err) => {
            if (err) throw err;
            res.json({ message: '회원가입 성공!' });
        });
    });
});

// 로그인
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: '사용자 이름 또는 비밀번호가 올바르지 않습니다.' });
        }
    });
});

// 게임 결과 저장
app.post('/game-result', (req, res) => {
    const { username, ammiChange } = req.body;

    db.query('UPDATE users SET totalAmmi = totalAmmi + ? WHERE username = ?', [ammiChange, username], (err) => {
        if (err) throw err;
        res.json({ message: '게임 결과 저장 완료!' });
    });
});

// 랭킹
app.get('/ranking', (req, res) => {
    db.query('SELECT username, totalAmmi FROM users ORDER BY totalAmmi DESC LIMIT 10', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3306, () => {
    console.log('서버가 포트 3306에서 실행 중입니다.');
});
