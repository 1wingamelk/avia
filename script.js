document.addEventListener('DOMContentLoaded', () => {
    const valueDisplay = document.getElementById('editableValue'); // Changed to editableValue based on index.html
    const playButton = document.getElementById('playButton');
    const cooldownTimer = document.getElementById('cooldownTimer');

    const COOLDOWN_SECONDS = 5;
    let isCooldown = false;
    let countdownInterval = null;
    let clickCount = 0; // Добавляем счетчик нажатий

    // Make valueDisplay editable
    valueDisplay.contentEditable = true; //
    valueDisplay.spellcheck = false; // Disable spellcheck for better UX

    // Function to generate a random value
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

        // When play button is clicked, disable manual editing
        valueDisplay.contentEditable = false; //
        valueDisplay.innerHTML = '<span class="loading-dots"><span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span></span>'; //

        setTimeout(() => {
            const newValue = generateRandomValue();
            valueDisplay.textContent = `${newValue}X`;
            valueDisplay.contentEditable = true; // Re-enable editing after value is set
            startCooldown();
        }, 1500); // 1.5 секунды для анимации загрузки
    });

    // Handle manual input:
    // Ensure only numbers and 'X' are allowed and automatically append 'X' if missing
    valueDisplay.addEventListener('input', () => { //
        let text = valueDisplay.textContent.trim().toUpperCase(); //
        // Remove all non-numeric characters except 'X'
        text = text.replace(/[^0-9.]/g, ''); // Allow digits and a decimal point

        // Ensure only one decimal point
        const parts = text.split('.'); //
        if (parts.length > 2) { //
            text = parts[0] + '.' + parts.slice(1).join(''); //
        }

        // Add 'X' at the end if it's not there
        if (!text.endsWith('X') && text !== '') { //
            text += 'X'; //
        }
        
        valueDisplay.textContent = text; //

        // Keep cursor at the end (optional, but improves UX)
        const range = document.createRange(); //
        const sel = window.getSelection(); //
        range.selectNodeContents(valueDisplay); //
        range.collapse(false); //
        sel.removeAllRanges(); //
        sel.addRange(range); //
    });

    // Add a check to reset the initial "???" when user focuses
    valueDisplay.addEventListener('focus', () => { //
        if (valueDisplay.textContent === '???') { //
            valueDisplay.textContent = ''; //
        }
    });

    // Restore "???" if empty after focus out
    valueDisplay.addEventListener('blur', () => { //
        if (valueDisplay.textContent.trim() === '') { //
            valueDisplay.textContent = '???'; //
        }
    });
});
