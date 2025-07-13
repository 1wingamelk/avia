document.addEventListener('DOMContentLoaded', () => {
    const valueDisplay = document.getElementById('valueDisplay');
    const playButton = document.getElementById('playButton');
    const cooldownTimer = document.getElementById('cooldownTimer');

    const COOLDOWN_SECONDS = 15;
    let isCooldown = false;
    let countdownInterval = null;
    let clickCount = 0; // Добавляем счетчик нажатий

    // Функция для генерации случайного значения
    function generateRandomValue() {
        clickCount++; // Увеличиваем счетчик при каждом нажатии

        if (clickCount % 5 === 0) {
            // Каждое 5-е нажатие: значение от 8 до 10
            const randomNum = Math.random() * (100 - 80) + 80; // От 80 до 100 для toFixed(1)
            return (randomNum / 10).toFixed(1);
        } else {
            // Чаще всего: значение от 0 до 2
            const randomNum = Math.random() * 20; // От 0 до 20 для toFixed(1)
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
