document.addEventListener('DOMContentLoaded', function() {
    let totalAmmi = 5000;

    function updateTotalAmmiDisplay() {
        document.getElementById('total-ammi').textContent = totalAmmi;
    }

    document.getElementById('play-roulette').addEventListener('click', function() {
        const betAmount = parseInt(document.getElementById('bet-amount-roulette').value);
        const resultElement = document.getElementById('roulette-result');
        
        if (isNaN(betAmount) || betAmount <= 0) {
            resultElement.textContent = '유효한 애미 수를 입력하세요.';
            return;
        }
        
        if (betAmount > totalAmmi) {
            resultElement.textContent = '애미가 부족합니다!';
            return;
        }

        const random = Math.random() * 100;
        let resultText = '';
        let finalAmount = 0;

        if (random < 10) {
            resultText = '우흥~';
            finalAmount = 0;
        } else if (random < 30) {
            resultText = '반띵! 절반 잃음!';
            finalAmount = betAmount * 0.5;
        } else if (random < 50) {
            resultText = '본전! 그대로 돌려받음!';
            finalAmount = betAmount;
        } else if (random < 80) {
            resultText = '이득! 150% 돌려받음!';
            finalAmount = betAmount * 1.5;
        } else if (random < 90) {
            resultText = '애매! 120% 돌려받음!';
            finalAmount = betAmount * 1.2;
        } else {
            resultText = '애매2! 80% 돌려받음!';
            finalAmount = betAmount * 0.8;
        }

        totalAmmi = totalAmmi - betAmount + Math.floor(finalAmount);
        updateTotalAmmiDisplay();

        resultElement.textContent = `${resultText} 최종 애미: ${Math.floor(finalAmount)} 애미`;
    });

    document.getElementById('play-dice').addEventListener('click', function() {
        const betAmount = parseInt(document.getElementById('bet-amount-dice').value);
        const pick1 = parseInt(document.getElementById('dice-pick1').value);
        const pick2 = parseInt(document.getElementById('dice-pick2').value);
        const resultElement = document.getElementById('dice-result');

        if (isNaN(betAmount) || betAmount <= 0 || isNaN(pick1) || isNaN(pick2) || pick1 === pick2 || pick1 < 1 || pick1 > 8 || pick2 < 1 || pick2 > 8) {
            resultElement.textContent = '유효한 애미 수와 숫자를 입력하세요.';
            return;
        }

        if (betAmount > totalAmmi) {
            resultElement.textContent = '애미가 부족합니다!';
            return;
        }

        const random1 = Math.floor(Math.random() * 8) + 1;
        const random2 = Math.floor(Math.random() * 8) + 1;

        let resultText = `주사위 결과: ${random1}, ${random2}`;
        let finalAmount = 0;

        if ((pick1 === random1 || pick1 === random2) && (pick2 === random1 || pick2 === random2)) {
            resultText += ' 두 숫자 모두 맞췄습니다! 150% 돌려받음!';
            finalAmount = betAmount * 1.5;
        } else if (pick1 === random1 || pick1 === random2 || pick2 === random1 || pick2 === random2) {
            resultText += ' 한 숫자 맞췄습니다! 120% 돌려받음!';
            finalAmount = betAmount * 1.2;
        } else {
            resultText += ' 숫자를 모두 틀렸습니다. 80% 돌려받음!';
            finalAmount = betAmount * 0.8;
        }

        totalAmmi = totalAmmi - betAmount + Math.floor(finalAmount);
        updateTotalAmmiDisplay();

        resultElement.textContent = `${resultText} 최종 애미: ${Math.floor(finalAmount)} 애미`;
    });

    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        document.getElementById('signup-result').textContent = result.message;
    });

    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        document.getElementById('login-result').textContent = result.message;
    });

    async function loadRanking() {
        const response = await fetch('/ranking');
        const rankings = await response.json();
        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = '';

        rankings.forEach(rank => {
            const listItem = document.createElement('li');
            listItem.textContent = `${rank.username} - ${rank.totalAmmi}`;
            rankingList.appendChild(listItem);
        });
    }

    loadRanking();
});
