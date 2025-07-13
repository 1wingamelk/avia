document.addEventListener('DOMContentLoaded', () => {
    const valueDisplay = document.getElementById('valueDisplay');
    const playButton = document.getElementById('playButton');
    const cooldownTimer = document.getElementById('cooldownTimer');

    const COOLDOWN_SECONDS = 5;
    let isCooldown = false;
    let countdownInterval = null;
    let clickCount = 0; // Добавляем счетчик нажатий

    // Функция для генерации случайного значения
    function generateRandomValue() {
        clickCount++; // Увеличиваем счетчик при каждом нажатии

        if (clickCount % 6 === 0) {
            // Каждое 6-е нажатие: значение от 10 до 50
            // Генерируем число от 100 до 500, затем делим на 10
            const randomNum = Math.random() * (500 - 100) + 100;
            return (randomNum / 10).toFixed(1);
        } else if (clickCount % 3 === 0) {
            // Каждое 3-е нажатие (если не 6-е): значение от 2 до 10
            // Генерируем число от 20 до 100, затем делим на 10
            const randomNum = Math.random() * (100 - 20) + 20;
            return (randomNum / 10).toFixed(1);
        } else {
            // Чаще всего (не 3-е и не 6-е нажатие): значение от 0 до 2
            // Генерируем число от 0 до 20, затем делим на 10
            const randomNum = Math.random() * (20 - 0) + 0;
            return (randomNum / 10).toFixed(1);
        }
    }

    function startCooldown() {
        isCooldown = true;
        playButton.disabled = true;
        let remainingTime = COOLDOWN_SECONDS;
        cooldownTimer.textContent = `Перезарядка: ${remainingTime}с`;

        countdownInterval = setInterval(() => {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                cooldownTimer.textContent = '';
                playButton.disabled = false;
                isCooldown = false;
            } else {
                cooldownTimer.textContent = `Перезарядка: ${remainingTime}с`;
            }
        }, 1000);
    }

    playButton.addEventListener('click', () => {
        if (isCooldown) {
            return;
        }

        valueDisplay.innerHTML = '<span class="loading-dots"><span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span></span>';

        setTimeout(() => {
            const newValue = generateRandomValue();
            valueDisplay.textContent = `${newValue}X`;
            startCooldown();
        }, 1500); // 1.5 секунды для анимации загрузки
    });
});
