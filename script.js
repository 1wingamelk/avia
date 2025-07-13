document.addEventListener('DOMContentLoaded', () => {
    const valueDisplay = document.getElementById('valueDisplay');
    const playButton = document.getElementById('playButton');
    const cooldownTimer = document.getElementById('cooldownTimer');

    const COOLDOWN_SECONDS = 5;
    let isCooldown = false;
    let countdownInterval = null;
    // clickCount is no longer needed as the value is fixed
    // let clickCount = 0; // Добавляем счетчик нажатий

    // Modified function to always return "15.8"
    function generateRandomValue() {
        // We no longer need the clickCount logic as the value is fixed.
        // clickCount++;
        return "15.8"; // Always return 15.8
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
            valueDisplay.textContent = `${newValue}X`; // Append "X" here
            startCooldown();
        }, 1500); // 1.5 секунды для анимации загрузки
    });
});
