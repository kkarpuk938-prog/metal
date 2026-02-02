// 1. КОНФИГУРАЦИЯ TELEGRAM (ВАШИ ДАННЫЕ)
const TOKEN = "8024983218:AAEOib7wTWosOWoB-shxkYmV_4iZMdvE3sk"; 
const CHAT_ID = "1044406442";

// 2. МАСКА ТЕЛЕФОНА (+7 вечная и 10 цифр)
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value;
        if (!value.startsWith('+7 ')) {
            e.target.value = '+7 ';
        }
        let digits = value.substring(3).replace(/\D/g, '');
        if (digits.length > 10) {
            digits = digits.substring(0, 10);
        }
        e.target.value = '+7 ' + digits;
    });

    phoneInput.addEventListener('keydown', function(e) {
        if (e.target.selectionStart <= 3 && (e.keyCode === 8 || e.keyCode === 46)) {
            e.preventDefault();
        }
    });
}

// 3. ОТПРАВКА ФОРМЫ
const tgForm = document.getElementById('tgForm');

if (tgForm) {
    tgForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const msg = document.getElementById('msg').value;

        const message = `🚀 НОВЫЙ ЗАКАЗ\n\n👤 Имя: ${name}\n📞 Тел: ${phone}\n🛠 Услуга: ${service}\n📝 Описание: ${msg}`;
        
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        
        // Отправка через POST (более надежно)
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        })
        .then(response => {
            if(response.ok) {
                alert('✅ Заявка отправлена! Проверьте Telegram.');
                tgForm.reset();
                if(phoneInput) phoneInput.value = '+7 ';
            } else {
                alert('❌ Ошибка! Убедитесь, что вы нажали START в боте.');
            }
        })
        .catch(error => {
            alert('❌ Ошибка сети. Попробуйте позже.');
            console.error(error);
        });
    });
}

// 4. МОБИЛЬНОЕ МЕНЮ
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
