document.addEventListener('DOMContentLoaded', function() {
    const logoBtn = document.getElementById('logo-btn');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-modal');
    const serverInfo = document.getElementById('server-info');
    const serverStatus = document.getElementById('server-status');
    const serverIp = document.getElementById('server-ip');
    const copyBtn = document.getElementById('copy-btn');
    
    // Обработчик клика по логотипу
    logoBtn.addEventListener('click', function() {
        modal.classList.add('active');
        fetchServerInfo();
    });
    
    // Закрытие модального окна
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Закрытие при клике вне области контента
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Копирование IP адреса
    serverIp.addEventListener('click', copyIpToClipboard);
    copyBtn.addEventListener('click', copyIpToClipboard);
    
    function copyIpToClipboard() {
        const ip = 'tcp.cloudpub.ru:27271';
        navigator.clipboard.writeText(ip).then(() => {
            showCopyNotification();
        }).catch(err => {
            // Fallback для браузеров без поддержки clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = ip;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopyNotification();
            } catch (fallbackErr) {
                console.error('Ошибка при копировании: ', fallbackErr);
            }
            document.body.removeChild(textArea);
        });
    }
    
    function showCopyNotification() {
        // Создаем или находим уведомление
        let notification = document.querySelector('.copy-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = 'IP скопирован в буфер обмена!';
            document.body.appendChild(notification);
        }
        
        // Показываем уведомление
        notification.classList.add('show');
        
        // Скрываем через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Проверка статуса сервера при загрузке
    checkServerStatus();
    
    // Функция для проверки статуса сервера
    async function checkServerStatus() {
        try {
            const response = await fetch('/.netlify/functions/server-status');
            const data = await response.json();
            
            if (data.online) {
                serverStatus.innerHTML = `
                    <div class="status-online">
                        <i class="fas fa-check-circle"></i> ${data.message}
                    </div>
                    <div class="players-count">
                        Игроков онлайн: ${data.players || 0}/${data.maxPlayers || 20}
                    </div>
                `;
            } else {
                serverStatus.innerHTML = `
                    <div class="status-offline">
                        <i class="fas fa-times-circle"></i> ${data.message}
                    </div>
                    <div class="players-count">
                        Сервер недоступен
                    </div>
                `;
            }
        } catch (error) {
            serverStatus.innerHTML = `
                <div class="status-error">
                    <i class="fas fa-exclamation-circle"></i> Ошибка при проверке статуса сервера
                </div>
            `;
            console.error('Error:', error);
        }
    }
    
    // Функция для получения информации о сервере
    async function fetchServerInfo() {
        serverInfo.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i> Загрузка информации о сервере...
            </div>
        `;
        
        try {
            // Для Netlify используем статические данные
            const serverData = [
                { title: "Статус сервера", value: "Онлайн" },
                { title: "IP адрес", value: "tcp.cloudpub.ru:27271" },
                { title: "Версия Minecraft", value: "1.21.5" },
                { title: "Модпак", value: "Fabric" },
                { title: "Режим", value: "Выживание" },
                { title: "Игроков онлайн", value: "0/20" },
                { title: "Владелец", value: "REMQ" }
            ];
            
            displayServerInfo(serverData);
        } catch (error) {
            serverInfo.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i> Ошибка при загрузке информации о сервере
                </div>
            `;
            console.error('Error:', error);
        }
    }
    
    // Функция для отображения информации о сервере
    function displayServerInfo(data) {
        if (!data || data.length === 0) {
            serverInfo.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i> Не удалось загрузить информацию о сервере
                </div>
            `;
            return;
        }
        
        let html = '';
        data.forEach((item, index) => {
            html += `
                <div class="info-item">
                    <h3>${item.title}</h3>
                    <p>${item.value}</p>
                </div>
            `;
        });
        
        serverInfo.innerHTML = html;
    }
    
    // Добавляем дополнительные изображения для большего круга
    function addMoreImages() {
        const circleContainer = document.querySelector('.circle-images');
        if (!circleContainer) return;
        
        // Добавляем еще 9 изображений с разными углами
        for (let i = 0; i < 9; i++) {
            const angle = i * 40 + 20; // Смещаем на 20 градусов относительно первых
            const imgIndex = i % 9;
            
            const imageUrls = [
                'https://cdn.imgbin.com/19/9/17/imgbin-minecraft-pocket-edition-bread-minecraft-story-mode-season-two-bread-j2fPJVQ7HgMCxZLB2dMsgzFjT.jpg',
                'https://i.pinimg.com/736x/05/01/c2/0501c244b29b1874a7299a600c3a8204.jpg',
                'https://i.pinimg.com/736x/88/d9/d3/88d9d30f9a13082ed1a27b40cd9fab8c.jpg',
                'https://i.pinimg.com/736x/ab/be/55/abbe55461fa45b9896dcf371d92ac38c.jpg',
                'https://i.pinimg.com/736x/76/92/62/76926244f7a07061801a8503bb2bfb69.jpg',
                'https://i.pinimg.com/1200x/79/99/bc/7999bcaaaa7f91182b99ade6ed6f2601.jpg',
                'https://i.pinimg.com/1200x/55/3b/69/553b697f7b4b34ee2c00afbdd78b61d5.jpg',
                'https://i.pinimg.com/1200x/4a/47/6d/4a476dbdc1509f026faf1700c90788e6.jpg',
                'https://i.pinimg.com/736x/ce/c1/d7/cec1d7d8a96cd48fc59dbc7ec639b552.jpg'
            ];
            
            const div = document.createElement('div');
            div.className = 'circle-image';
            div.style.setProperty('--angle', `${angle}deg`);
            
            const img = document.createElement('img');
            img.src = imageUrls[imgIndex];
            img.alt = `Minecraft Image ${i + 10}`;
            
            div.appendChild(img);
            circleContainer.appendChild(div);
        }
    }
    
    // Добавляем дополнительные изображения после загрузки страницы
    setTimeout(addMoreImages, 1000);
});
