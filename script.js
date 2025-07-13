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
            // Каждое 5-е нажатие: значение от 12 до 50
            // Генерируем число от 120 до 500, затем делим на 10
            const randomNum = Math.random() * (500 - 120) + 120; 
            return (randomNum / 10).toFixed(1);
        } else {
            // Чаще всего: значение от 1 до 4 (этот диапазон остается прежним)
            const randomNum = Math.random() * (40 - 10) + 10;
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
