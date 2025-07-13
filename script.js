document.addEventListener('DOMContentLoaded', () => {
    const valueDisplay = document.getElementById('valueDisplay');
    const playButton = document.getElementById('playButton');
    const cooldownTimer = document.getElementById('cooldownTimer');

    const COOLDOWN_SECONDS = 15; // Время перезарядки в секундах
    let isCooldown = false;
    let countdownInterval = null;

    // Функция для генерации случайного значения от 0 до 1000 с одним знаком после запятой
    function generateRandomValue() {
        // Генерируем случайное число от 0 до 10000 (для одной десятичной цифры)
        const randomNum = Math.random() * 10000;
        // Округляем до одного знака после запятой
        return (Math.round(randomNum) / 10).toFixed(1);
    }

    function startCooldown() {
        isCooldown = true;
        playButton.disabled = true; // Отключаем кнопку
        let remainingTime = COOLDOWN_SECONDS;
        cooldownTimer.textContent = `Перезарядка: ${remainingTime}с`;

        countdownInterval = setInterval(() => {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                cooldownTimer.textContent = '';
                playButton.disabled = false; // Включаем кнопку
                isCooldown = false;
            } else {
                cooldownTimer.textContent = `Перезарядка: ${remainingTime}с`;
            }
        }, 1000);
    }

    playButton.addEventListener('click', () => {
        if (isCooldown) {
            return; // Если кулдаун активен, ничего не делаем
        }

        // Показываем пульсирующие точки
        valueDisplay.innerHTML = '<span class="loading-dots"><span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span></span>';

        // Через некоторое время показываем значение и запускаем кулдаун
        setTimeout(() => {
            const newValue = generateRandomValue();
            valueDisplay.textContent = `${newValue}X`;
            startCooldown();
        }, 1500); // 1.5 секунды для анимации загрузки
    });
});