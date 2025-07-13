document.addEventListener('DOMContentLoaded', () => {
    // Переименовали переменную с 'valueDisplay' на 'resultOutputElement'
    const resultOutputElement = document.getElementById('valueDisplay'); // Получаем элемент по его ID
    const playButton = document.getElementById('playButton');
    const cooldownTimer = document.getElementById('cooldownTimer');

    const COOLDOWN_SECONDS = 5;
    let isCooldown = false;
    let countdownInterval = null;
    // clickCount больше не нужен, так как значение фиксировано
    // let clickCount = 0;

    // Функция теперь всегда возвращает "15.8"
    function generateFixedValue() {
        return "15.8";
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

        // Используем новую переменную 'resultOutputElement'
        resultOutputElement.innerHTML = '<span class="loading-dots"><span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span></span>';

        setTimeout(() => {
            const fixedValue = generateFixedValue();
            // Используем новую переменную 'resultOutputElement'
            resultOutputElement.textContent = `${fixedValue}X`;
            startCooldown();
        }, 1500); // 1.5 секунды для анимации загрузки
    });
});
